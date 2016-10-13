app.controller('headerPage', function($scope,$state,Auth,Users) {
    $scope.auth = Auth;
    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
    	if (firebaseUser) {
    		    $scope.firebaseUser = firebaseUser;
		 		Users.all.$loaded().then(function(){
              	$scope.userName = Users.getDisplayName(firebaseUser.uid);
            });
    	}		
    $scope.logout = function(){
    		Users.getProfile(firebaseUser.uid).$loaded().then(function (profile){
    				profile.online = null;
		  			profile.$save().then(function(){
		    		Auth.$signOut().then(function(){
		    			window.location.reload();
		    		});
    	       });
		  });		
        };			
    });
})