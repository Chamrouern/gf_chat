app.controller('ProfileCtrl', function($state,Auth,Users,auth, profile) {
		var profileCtrl = this;
		profileCtrl.email = auth.email;
		profileCtrl.providerData = Auth.$getAuth().providerData["0"];
		profileCtrl.profile = {
					FirstName: profile.FirstName,
					LastName: profile.LastName,
					Address: profile.Address,
					Gender: profile.Gender,
			        displayName: profile.FirstName +" "+profile.LastName
		};
		profileCtrl.updateProfile = function(){
			Users.updateProfile(auth.uid,profileCtrl.profile).then(function(){
				$state.go('profile');
			});
		}
		profileCtrl.updatePassword = {
			email: profileCtrl.email,
  			oldPassword: "",
  			newPassword: ""
		}
		profileCtrl.changePassword = function(){
			Auth.$signInWithEmailAndPassword(profileCtrl.updatePassword.email,profileCtrl.updatePassword.oldPassword)
			.then(function(auth){
				Auth.$updatePassword(profileCtrl.updatePassword.newPassword);
					$state.go('profile');
			},function(error){
				profileCtrl.error = error;
			});
		}
	});