app.controller('ProfileCtrl', function($state,Users,auth, profile) {
		var profileCtrl = this;
		//profileCtrl.profile = profile;
		profileCtrl.email = auth.email;
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

	});