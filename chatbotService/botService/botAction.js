/*

@author: BingYing Wang
 */

var Journal = require('../models/journal.class');
function getBotAction(args){
  args = JSON.parse(args);
  var nextAction = args.next_action;
  var feedbackData;
  switch (nextAction) {
    case 'action_listen':
      feedbackData = 'action_listen';
      break;
    case 'action_restart':
      break;
    case 'utter_greet':
      feedbackData = '你好，我是智能机器人小白，我现在支持的功能如下:\n'
                    +'*查询日志\n'
                    +'*查询...\n'
                    +'请输入你要的工作,比如“查日志”';
      break;
    case 'utter_log_search':
      //调用查询接口
      feedbackData  = '查询日志的条件：';
      for(var prop in args.tracker.slots){
        feedbackData += prop + '是' + '"' + args.tracker.slots[''+prop+''] + '"，';
      }
      var journal = new Journal(args.tracker.slots[''+'ip'+''],args.tracker.slots[''+'date'+'']);
      feedbackData += journalSearch(journal);
      feedbackData += '还有什么能帮您吗?我现在支持的功能如下:\n'
                    +'*查询日志\n'
                    +'*查询...\n'
                    +'请输入你要的工作,比如“查日志”';
      //查询后重置该用户的信息
      break;
    case 'utter_inform_date':
      feedbackData = '你好,请按格式输入想要查询的时间,目前只支持查询某一天的日志.\n'
                    +'比如,你可以这样回答：“2018.01.01”';
      break;
    case 'utter_inform_ip':
      feedbackData = '你好,请按格式输入想要查询的IP,目前只支持查询单个IP.\n'
                    +'比如,你可以这样回答：“255.255.255.223”';
      break;
    case 'utter_unknown_intent':
      feedbackData = '你好，我目前只支持如下功能:\n'
                    +'*查询日志\n'
                    +'*查询...\n'
                    +'请输入你要的工作,比如“查日志”';
      break;
    case 'utter_goodbye':
      feedbackData = '再见，为您服务很开心';
      break;
    default:
      feedbackData = 'default';
  }
  return feedbackData;
}

function journalSearch(journal){
//调用日志查询接口
  return '查询结束，返回结果XXXXXX';
}
module.exports.getBotAction =  getBotAction;
