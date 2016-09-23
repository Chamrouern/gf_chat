	app.controller('AuthCtrl', function(Auth,Users, $state) {
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
		authCtrl.loginGoogle = function(){
			Auth.$signInWithPopup('google').then(function(auth){
				if (Users.all.$indexFor(auth.user.uid) == -1) {
					usersRef.child(auth.user.uid).set({
					FirstName:"",
					LastName:"",
					Address:"",
					Gender:"",
					displayName: auth.user.displayName
				})
				}
				$state.go('home');
			}, function(error) {
				authCtrl.error = error;
			});	
		};
		authCtrl.loginFacebook = function(){
			Auth.$signInWithPopup('facebook').then(function(auth){
				if (Users.all.$indexFor(auth.user.uid) == -1) {
				usersRef.child(auth.user.uid).set({
					FirstName:"",
					LastName:"",
					Address:"",
					Gender:"",
					displayName: auth.user.displayName
				})
			}
				$state.go('home');
			}, function(error) {
				authCtrl.error = error;
			});	
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