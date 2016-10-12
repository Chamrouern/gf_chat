app.controller('SentMailCtrl',function(toaster){
  var sentMailCtrl = this;
  sentMailCtrl.userEmail = ""; 
      var CLIENT_ID = '989195079014-s6a3cpdaqe9ncct7sfrivhof1t5nun7k.apps.googleusercontent.com';

      var SCOPES = ['https://mail.google.com/', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.labels'];

sentMailCtrl.handleAuthClick = function(isValid) {
  if (isValid) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
         sentMailCtrl.handleAuthResult);
      }
        return false;
    }
sentMailCtrl.handleAuthResult = function(authResult) {
        sentMailCtrl.sendEmail();
      }
sentMailCtrl.sendEmail = function() {
    var content     = '<div style="width: 100%; border: 1px solid #F0F0F0;background: #F0F0F0;">\
    <div style="width:80%;text-align:center;padding: 10px;border-top-left-radius:4px;border-top-right-radius:4px;\
        margin: 0 auto;margin-top: 10%;background: #FF604D;\
        color: #FFFFFF;">\
      <h2>GF-Chat Application</h2>\
    </div>\
    <div style="width:80%;border-bottom-left-radius:4px;padding: 10px;\
          border-bottom-right-radius:4px;margin: 0 auto;\
          margin-bottom: 10%;background: #FFFFFF;">\
          <h4>Dear Friends,</h4>\
      <p>I would love to invite you to join GF-Chat to communication with me!</p>\
      <p>Let register together to play chat with us.</p>\
      <a href="https://gf-chat.firebaseapp.com/#/">\
         <button type="button" style="background-color: #5BC0DE;\
            color: white; text-align: center;\
            padding: 10px 20px;cursor: pointer;\
            border-radius: 8px;margin-left: 28%;\
            font-weight: bold;">Let  Enjoy</button>\
      </a>\
    </div>\
  </div>';
    // I have an email account on GMail.  Lets call it 'theSenderEmail@gmail.com'
    var sender      = '';
    // And an email account on Hotmail.  Lets call it 'theReceiverEmail@gmail.com'\
    // Note: I tried several 'receiver' email accounts, including one on GMail.  None received the email.
    var receiver    = sentMailCtrl.userEmail;
    var to          = 'To: '   +receiver;
    var from        = 'From: ' +sender;
    var subject     = 'Subject: ' +'Welcome to GF-Chat Web Application';
    var contentType = 'Content-Type: text/html; charset=utf-8';
    var mime        = 'MIME-Version: 1.0';

    var message = "";
    message +=   to             +"\r\n";
    message +=   from           +"\r\n";
    message +=   subject        +"\r\n";
    message +=   contentType    +"\r\n";
    message +=   mime           +"\r\n";
    message +=    "\r\n"        + content;

   sentMailCtrl.sendMessage(message, receiver, sender);
};

sentMailCtrl.sendMessage = function(message, receiver, sender) {
    var headers = sentMailCtrl.getClientRequestHeaders();
    var path = "gmail/v1/users/me/messages/send?key=" + CLIENT_ID;
    var base64EncodedEmail = btoa(message).replace(/\+/g, '-').replace(/\//g, '_');
    gapi.client.request({
        path: path,
        method: "POST",
        headers: headers,
        body: {
            'raw': base64EncodedEmail
        }
    }).then(function (response) {
      if (response) {
        toaster.pop('success', 'Success Sent', 'Your invitation have been sent!');
        sentMailCtrl.userEmail = "";
      }
      

    });
}
sentMailCtrl.getClientRequestHeaders = function() {
    var  t = gapi.auth.getToken();
    var a = "Bearer " + t["access_token"];
    return {
        "Authorization": a,
        "X-JavaScript-User-Agent": "Google APIs Explorer"
    };
}
   FB.init({
  appId:'698639756968973',
  cookie:true,
  status:true,
  xfbml:true
 });
  sentMailCtrl.sendRequestViaMultiFriendSelector = function () {
    FB.ui({method: 'send',
      link: 'https://gf-chat.firebaseapp.com/'
    }, sentMailCtrl.requestCallback);
  }

 sentMailCtrl.requestCallback = function(response) {
    // Handle callback here
  }
})