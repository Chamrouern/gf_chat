	app.factory('Auth', function($firebaseAuth, FirebaseUrl) {
		var ref = new Firebase(FirebaseUrl);
		var auth = $firebaseAuth(firebase.auth());
		return auth;
	});