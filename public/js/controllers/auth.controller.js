app.controller('AuthCtrl', function(Auth,Users, $state,toaster) {
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
			toaster.pop('success', 'Success Login', 'Welcome to your profile');
			$state.go('home');
			}, function(error) {
				toaster.pop('error', error.code, error.message);
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
				toaster.pop('success', 'Success Login', 'Welcome to your profile');
				$state.go('home');
			}, function(error) {
				toaster.pop('error', error.code, error.message);
			});	
		};
		authCtrl.login = function(isvalid) {
			if (isvalid) {
			Auth.$signInWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(auth) {
				toaster.pop('success', 'Success Login', 'Welcome to your profile');
				$state.go('home');
			}, function(error) {
				toaster.pop('error', error.code, error.message);
			});
		}
		};
		authCtrl.register = function(isvalid) {
			if (isvalid) {
			Auth.$createUserWithEmailAndPassword(authCtrl.user.email,authCtrl.user.password).then(function(user) {
				usersRef.child(user.uid).set({
					FirstName: authCtrl.user.firstName,
					LastName: authCtrl.user.lastName,
					Address: authCtrl.user.address,
					Gender: authCtrl.user.gender,
					displayName: authCtrl.user.firstName +" "+authCtrl.user.lastName
				});
				authCtrl.login(isvalid);
			}, function(error) {
				toaster.pop('error', error.code, error.message);
			});	
		}
		};
	});