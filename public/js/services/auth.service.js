	app.factory('Auth', function($firebaseAuth) {
		var auth = $firebaseAuth(firebase.auth());
		return auth;
	});