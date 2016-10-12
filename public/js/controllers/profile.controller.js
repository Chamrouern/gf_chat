app.controller('ProfileCtrl', function($state,Auth,Users,auth, profile,toaster) {
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
		profileCtrl.updateProfile = function(isvalid){
			if (isvalid) {
				Users.updateProfile(auth.uid,profileCtrl.profile).then(function(){
					$state.go('profile');

				});
			}
		}
		profileCtrl.updatePassword = {
			email: profileCtrl.email,
  			oldPassword: "",
  			newPassword: ""
		}
		profileCtrl.changePassword = function(isvalid){
			if (isvalid) {
			Auth.$signInWithEmailAndPassword(profileCtrl.updatePassword.email,profileCtrl.updatePassword.oldPassword)
			.then(function(auth){
				Auth.$updatePassword(profileCtrl.updatePassword.newPassword);
					$state.go('profile');
					toaster.pop('success', 'Change Password', 'Your Password have been change!');
			},function(error){
				toaster.pop('error', error.code, error.message);
			});
			}
		}
	});