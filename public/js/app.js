
if ('serviceWorker' in navigator) { console.log('Service Worker is supported'); navigator.serviceWorker.register('sw.js').then(function() { return navigator.serviceWorker.ready; }).then(function(reg) { console.log('Service Worker is ready :^)', reg); reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) { console.log('endpoint:', sub.endpoint); }); }).catch(function(error) { console.log('Service Worker error :^(', error); }); }
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTwgH63N0JfVzoUCWkEWqQO0jzNigPjlo",
    authDomain: "gf-chat.firebaseapp.com",
    databaseURL: "https://gf-chat.firebaseio.com",
    storageBucket: "gf-chat.appspot.com",
  };
  firebase.initializeApp(config);

var app = angular.module("chatApp", ['firebase','ui.router','luegg.directives','toaster','validation', 'validation.rule']);
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
        templateUrl: function() {
              return 'views/chat/index.html?' + +new Date();
            },
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
        templateUrl: function() {
              return 'views/chat/team/create.html?' + +new Date();
            },
        controller: 'TeamsCtrl as teamsCtrl'
      })
      .state('teams.invite', {
        url: '/invite',
        templateUrl: function() {
              return 'views/chat/team/invite.html?' + +new Date();
            },
        controller: 'SentMailCtrl as sentMailCtrl'
      })
      .state('teams.messages', {
        url: '/{teamsId}/messages',
        templateUrl:  function() {
              return 'views/chat/messages.html?' + +new Date();
            },
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
        templateUrl: function() {
              return 'views/chat/messages.html?' + +new Date();
            },
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
        templateUrl: function() {
              return 'views/users/profile.html?' + +new Date();
            },
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
      .state('edit',{
        url: '/profile/edit',
        templateUrl: function() {
              return 'views/users/edit.html?' + +new Date();
            },
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
      .state('changePassword',{
        url: '/profile/changePassword',
        templateUrl: function() {
              return 'views/users/changePassword.html?' + +new Date();
            },
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