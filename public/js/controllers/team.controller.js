app.controller('TeamsCtrl', function($state, Auth, Users, profile, teams) {
		var teamCtrl = this;
		teamCtrl.Auth = Auth.$getAuth();
		teamCtrl.numberUser = Users.all.length;
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
		teamCtrl.deleteTeam = function(id){
			teamCtrl.teams.$remove(teamCtrl.teams.$getRecord(id));
			$state.go('teams');
		}
		teamCtrl.editTeam = function(id){
			$state.go("teams.update").then(function(){
				teamCtrl.newTeam = teamCtrl.teams.$getRecord(id);
			});
		}
		teamCtrl.member = function(id){
			return Users.getDisplayName(id);
		}
		teamCtrl.countMember = function(member){
			return member.length;
		}
		teamCtrl.createTeam = function(isvalid){
			if (isvalid) {
				teamCtrl.newTeam.member.push(profile.$id);
		 		teamCtrl.teams.$add(teamCtrl.newTeam).then(function(ref){
		    	$state.go('teams.messages', {teamsId: ref.key});
		  		});
			}
		};
	});