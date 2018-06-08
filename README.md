#### *Architechture*

1. chatbot(python3): Use rasa nlu and rasa core as backend. And use rasa core as a http server.
2. chatbotService(nodeJs): Forwarding different clients requests to chatbot and then receive chatbot's actions to forward to different clients.
3. chatbotClient(nodeJs): Different user use different client to get service from chatbot.

<br>
<br>

#### *Statement*
This project is still in the process of development.

<br>

1. Questions or advises about chatbot: contact to @BingYing Wang, @Wei Qiao, email: bingyingwang@hotmail.com, qw.urey@gmail.com
2. Questions or advises about chatbotService and chatbotClient: contact to @BingYing Wang, email: bingyingwang@hotmail.com

<br>
<br>

#### *How to start*

```
cd ~/chatbotRemote/chatbot
./start.sh

cd ~/chatbotRemote/chatbotClient
npm start

cd ~/chatbotRemote/chatbotService
npm start

open url: http://127.0.0.1:4000/index.html
```