/*

@author: BingYing Wang
 */

var express = require('express');
var router = express.Router();
var async = require('async');
var botAction = require('../botService/botAction.js');
var config = require('../configure.js');
var http = require('http');

router.post('/', function (req, res) {
    var userId = req.body.userId;
    console.log('service收到的请求是' + JSON.stringify(req.body));
    async.waterfall([
      function(callback){//与chatbot交互:转发client请求,返回responseData到args中
          console.log('转发client请求给chatbot');
          postToBotAndGetAnswer({'query':req.body.text}, userId, 'parse', callback);
      },
      function(args, callback){//与client交互:转发chatbot的返回值
          console.log('转发chatbot返回值给client');
          //args:  responseData, chatbot返回的数据
          var feedbackData = botAction.getBotAction(args);//将返回值解析成client将要显示的数据
          res.send(JSON.stringify({'text':feedbackData}));
          console.log('service返回给client的数据是: '+JSON.stringify({text:feedbackData}));
          callback(null, JSON.parse(args));
      },
      function(args, callback){//与chatbot交互:发送做完的nextAction给bot
          console.log('向chatbot发送已确认执行');
          //var actionToBot = {executed_action:args, events:[{"event": "reset_slots"}]};
          //console.log('server====222=========发出的数据是：'+JSON.stringify(actionToBot));
          var events = [];
          if(args.next_action == 'utter_log_search'){
              events = [{"event": "reset_slots"}];
          }else{
              for(var prop in args.tracker.slots){
                  var event = {
                    'event':'slot',
                    'name':prop,
                    'value':args.tracker.slots[''+prop+'']
                  }
                  events.push(event);
              }
          }
          var actionToBot = {'executed_action':args.next_action, 'events': events };
          postToBotAndGetAnswer(actionToBot, userId, 'continue', callback);
      },
      function(args, callback){
      }
    ],
    function (err, result) {
        if (err) {
          console.log("向Bot发送请求并获取结果发生错误:"+err);
        }}
    );
});

/**
 * [postToBotAndGetAnswer 发送数据给Bot并获取Bot的响应信息]
 * @param  {[string]} data [发送给Bot的数据]
 * @return {[Json]} responseData [Bot返回的数据]
 */
function postToBotAndGetAnswer(data, userId, path, callback){
    var responseData = null;//向bot请求到的数据
    /////中文一定要用buff过一下，否则length不对，大坑！！！！
    var dataString = new Buffer(JSON.stringify(data));

    var postOptions = {
        host: config.BOT_HOST,
        port: config.BOT_PORT,
        path: '/conversations/' + userId + '/' + path,
        method: 'POST',
        headers: {
          'content-type':'application/json',
          'Content-Length': dataString.length
        }
    };
    var req = http.request(postOptions, function(res){
        console.log('chatBotService发给Bot的数据是: ' + dataString);
        console.log('chatBotService发给Bot的请求是: ' + JSON.stringify(postOptions));
        res.setEncoding('utf-8');

        var chunks = [];
        var size = 0;
        res.on('data', function(chunk){
            chunks.push(chunk);
            size += chunk.length;
        });
        res.on('end', function(){
            switch(chunks.length) {
              case 0:
                  responseData = new Buffer(0);
                  break;
              case 1:
                  responseData = chunks[0];
                  break;
              default:
                  responseData = new Buffer(size);
                  for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
                      var chunk = chunks[i];
                      chunk.copy(responseData, pos);
                      pos += chunk.length;
                  }
                  break;
            }
            console.log('Bot返回的数据: ' + responseData);
            callback(null, responseData);//返回向bot请求到的数据
        });
    });
    req.write(dataString);
    //当调用end的时候请求才会真正发出
    req.end();
    req.on('error', function (e) {
      console.log('problem with request: ' + e.message);
    });
}

module.exports = router;
