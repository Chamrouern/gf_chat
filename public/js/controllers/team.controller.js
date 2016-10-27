app.controller('TeamsCtrl', function($state, Auth, Users, profile, teams) {
		var teamCtrl = this;
		teamCtrl.profile = profile;
		teamCtrl.teams = teams;
		teamCtrl.getDisplayName = Users.getDisplayName;
		teamCtrl.getGravatar = Users.getGravatar;
		teamCtrl.users = Users.all;
		Users.setOnline(profile.$id);	
		teamCtrl.newTeam = {
			name: '',
			discription: '',
			member: []	
		};
		teamCtrl.createTeam = function(isvalid){
			if (isvalid) {
				teamCtrl.newTeam.member.push(profile.$id);
		 		teamCtrl.teams.$add(teamCtrl.newTeam).then(function(ref){
		    	$state.go('teams.messages', {teamsId: ref.key});
		  		});
			}
		};
	});