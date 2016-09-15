// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTwgH63N0JfVzoUCWkEWqQO0jzNigPjlo",
    authDomain: "gf-chat.firebaseapp.com",
    databaseURL: "https://gf-chat.firebaseio.com",
    storageBucket: "gf-chat.appspot.com",
  };
  firebase.initializeApp(config);

var app = angular.module("chatApp", ['firebase','ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) { 
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/post/home.html',
        resolve: {
           requireNoAuth : function(Auth,$state){ 
           return Auth.$requireSignIn().then(function(auth){
            $state.go('teams');
          },function(error){
            return;
          });
        }
      }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/auth/register.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
           requireNoAuth : function(Auth,$state){ 
           return Auth.$requireSignIn().then(function(auth){
            $state.go('home');
        },function(error){
            return;
          });
        }
      }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
           requireNoAuth : function(Auth,$state){   
           return Auth.$requireSignIn().then(function(auth){
            $state.go('home');
          },function(error){
            return;
          });
        }
      }
      })
       .state('teams', {
        url: '/teams',
        controller: 'TeamsCtrl as teamsCtrl',
        templateUrl: 'views/chat/index.html',
        resolve: {
          teams: function (Teams){
            return Teams.$loaded();
          },
          profile: function ($state, Auth, Users){
            return Auth.$requireSignIn().then(function(auth){
              return Users.getProfile(auth.uid).$loaded().then(function (profile){
                return profile;
              });
            }, function(error){
              $state.go('home');
            });
          }
        }
      })
      .state('teams.create', {
        url: '/create',
        templateUrl: 'views/chat/team/create.html',
        controller: 'TeamsCtrl as teamsCtrl'
      })
      .state('teams.messages', {
        url: '/{teamsId}/messages',
        templateUrl: 'views/chat/messages.html',
        controller: 'MessagesCtrl as messagesCtrl', 
        resolve: {
          messages: function($stateParams, Messages){
            return Messages.forChannel($stateParams.teamsId).$loaded();
          },
          teamName: function($stateParams, teams){
            return '#'+teams.$getRecord($stateParams.teamsId).name;
          },
          teamDescription:function($stateParams, teams){
            return teams.$getRecord($stateParams.teamsId).discription;
          }
        }
        
      })
      .state('teams.direct', {
        url: '/{uid}/messages/direct',
        templateUrl: 'views/chat/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
          messages: function($stateParams, Messages, profile){
            return Messages.forUsers($stateParams.uid, profile.$id).$loaded();
          },
          teamName: function($stateParams, Users){
            return Users.all.$loaded().then(function(){
              return '@'+Users.getDisplayName($stateParams.uid);
            });
          },
          teamDescription: function($stateParams, Users){
            return Users.all.$loaded().then(function(){
              return '*@*Live in '+Users.getAddress($stateParams.uid)+" *@*";
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/auth/profile.html',
        controller: 'ProfileCtrl as profileCtrl',
        resolve: {
          auth: function($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('home');
            });
          },
          profile: function(Users, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('gift', {
        url: '/gift',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/post/gift.html'
      })
      .state('freebie', {
        url: '/freebie',
        templateUrl: 'views/post/freebie.html',
      })
      	$urlRouterProvider.otherwise('/');
       })
      .constant('FirebaseUrl', 'https://gf-chat.firebaseio.com');