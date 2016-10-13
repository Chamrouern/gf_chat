app.factory('Messages', function($firebaseArray) {
	var teamMessagesRef = firebase.database().ref("/teamMessages");
	var userMessagesRef = firebase.database().ref("/userMessages");
	return {
		  forChannel: function(channelId){
		    return $firebaseArray(teamMessagesRef.child(channelId));
		  },
		  forUsers: function(uid1, uid2){
		    var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;
		    return $firebaseArray(userMessagesRef.child(path));
		 }
	};
});