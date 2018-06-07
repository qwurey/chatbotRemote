<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="css/index.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    .content
    {
        position:relative;
        font-family: "Microsoft YaHei";
    }
    .content
    {
        width:220px;
        height:42px;
        line-height:42px;
        color:#fff;
        background-color:rgb(45, 121, 66);
        font-size:16px;
        text-align:center;
        display:block;
        float:left;
        overflow:hidden;
        position:absolute;
        right:10px;
        top:10px;
        text-decoration:none;
        font-family: "Microsoft YaHei";
        border:2px solid rgb(45, 121, 66);
    }
    .content :hover
    {
        color:green;
        background-color:#fff;
    }
    </style>
</head>
<body>

<form action="ajax.aspx" method="post" onsubmit="ltgo();return false;">
<div class="content">
<div class="chatroom">
    <div id="talkbox">
        <div id="liaotian"></div>
    </div>
    <br />
    <div class="sendbox">
    <div class="inputroom">
        <input type="text" class="userinput" name="lt_put" id="lt_put" title="按回车键发送" />
    </div>
    <div class="buttomroom">
        <input type="submit" id="chatbtn" value="发送" title="按回车键发送" />
    </div>

    </div>
</div>

</div>
</form>
<script language="javascript" type="text/javascript">
function ltgo()
{
    var newmsg=$("#lt_put").val();
    if(newmsg=="") return;
    $("#lt_put").css({"background-image":"url(/images/loader3.gif)","background-repeat":"no-repeat","background-position":"270px 10px"});
    addmsg("我：",newmsg);
    $("#lt_put").val("");
    $.post("/api/simsimi/",{"txt":newmsg},function(data){
        console.log(data);
        addmsg("小黄鸡：",data.text);
        $("#lt_put").css({"background-image":"none"});
    });
}
function addmsg(username,msg)
{
    var oldhtml=$("#liaotian").html();
    if(username=="我：")
    {
        newhtml="<div class='me'><span class='me_img'></span><span class='me_msg'>"+msg+"</span></div>";
    }
    else
    {
        newhtml="<div class='bot'><span class='bot_img'></span><span class='bot_msg'>"+msg+"</span></div>";
    }
    $("#liaotian").html(oldhtml+newhtml);
    var scrollTop = $("#liaotian")[0].scrollHeight;
    $("#liaotian").scrollTop(scrollTop);
}
addmsg("小黄鸡：", "<font style='line-height:40px;'>Hi~~~,和我聊聊天吧，悄悄告诉你</font><br />现在关注我的微信公众号（牛人趣事-niurenqushi）也可以和我聊天哦，扫一扫咱们开聊吧。<br /><img src='images/qrcode_for_gh_a5dc917769fc_258.jpg' />");
</script>

</body>
</html>
