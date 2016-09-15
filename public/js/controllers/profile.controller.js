app.controller('ProfileCtrl', function($state, auth, profile) {
		var profileCtrl = this;
		profileCtrl.profile = profile;
	});