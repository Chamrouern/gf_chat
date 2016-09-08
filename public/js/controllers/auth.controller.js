	app.controller('AuthCtrl', function(Auth, $state) {
		var authCtrl = this;
		var usersRef = firebase.database().ref("users");
		authCtrl.user = {
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			address: '',
			gender: ''
		};
		authCtrl.login = function() {
			Auth.$signInWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(auth) {
				$state.go('home');
			}, function(error) {
				authCtrl.error = error;
			});
		};
		authCtrl.register = function() {
			Auth.$createUserWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(user) {
				usersRef.child(user.uid).set({
					FirstName: authCtrl.user.firstName,
					LastName: authCtrl.user.lastName,
					Address: authCtrl.user.address,
					Gender: authCtrl.user.gender,
					displayName: authCtrl.user.firstName +" "+authCtrl.user.lastName
				});
				authCtrl.login();
			}, function(error) {
				authCtrl.error = error;
			});	
		};
	});