#### *Architechture*

1. chatbot: Use rasa nlu and rasa core as backend. And use rasa core as a http server.
2. chatbotService: Forwarding different clients requests to chatbot and then receive chatbot's actions to forward to different clients.
3. chatbotClient: Different user use different client to get service from chatbot.

<br>
<br>

#### *Statement*
This project is still in the process of development.

<br>

1. Questions or advises about chatbot: contact to @Wei Qiao, email: qw.urey@gmail.com
2. Questions or advises about chatbotService and chatbotClient: contact to @BingYing Wang, email: 

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