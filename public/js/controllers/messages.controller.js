	app.controller('MessagesCtrl', function(Auth,profile, teamName, teamDescription, messages) {
		var messagesCtrl = this;
		messagesCtrl.Auth = Auth.$getAuth();
		messagesCtrl.messages = messages;
		messagesCtrl.teamName = teamName;
		messagesCtrl.teamDescription = teamDescription;
		messagesCtrl.message = '';
		messagesCtrl.sendMessage = function (){
		  if(messagesCtrl.message.length > 0){
		    messagesCtrl.messages.$add({
		      uid: profile.$id,
		      body: messagesCtrl.message,
		      timestamp: Firebase.ServerValue.TIMESTAMP
		    }).then(function (){
		      messagesCtrl.message = '';
		    });
		  }
		
		};
		  messagesCtrl.delectMessage = function(item){		  	
            messagesCtrl.messages.$remove(item);
		  };
	});
