app.factory('Users', function($firebaseArray, $firebaseObject) {
		var usersRef = firebase.database().ref("users");
		var connectedRef = firebase.database().ref(".info/connected");
		var users = $firebaseArray(usersRef);
		var Users = {
			getProfile: function(uid) {
				return $firebaseObject(usersRef.child(uid));
			},
			getDisplayName: function(uid) {
				return users.$getRecord(uid).displayName;
			},
			getAddress:function(uid){
				return users.$getRecord(uid).Address;
			},
			getGravatar: function(uid) {
				return 'http://www.bongthom.com/Clients/4425/Images/RUC.gif';
			},
			setOnline: function(uid){
			  var connected = $firebaseObject(connectedRef);
			  var online = $firebaseArray(usersRef.child(uid+'/online'));

			  connected.$watch(function (){
			    if(connected.$value === true){
			      online.$add(true).then(function(connectedRef){
			        connectedRef.onDisconnect().remove();
			      });
			    }
			  });
			},
			all: users
		};
		return Users;
	});