app.factory('Teams', function($firebaseArray) {
		var ref = firebase.database().ref("/teams");
		var channels = $firebaseArray(ref);
		return channels;
});