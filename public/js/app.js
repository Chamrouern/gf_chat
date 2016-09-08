// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBTwgH63N0JfVzoUCWkEWqQO0jzNigPjlo",
    authDomain: "gf-chat.firebaseapp.com",
    databaseURL: "https://gf-chat.firebaseio.com",
    storageBucket: "gf-chat.appspot.com",
  };
  firebase.initializeApp(config);

var app = angular.module("chatApp", ["firebase",'ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) { 
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/post/home.html',
        resolve: {
           requireNoAuth : function(Auth,$state){ 
           return Auth.$requireSignIn().then(function(auth){
            $state.go('gift');
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
            $state.go('gift');
        },function(error){
            return;
          });
        }
      }
      })
      .state('chatbox', {
        url: '/chatbox',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/chat/chatbox.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
        controller: 'AuthCtrl as authCtrl',
        resolve: {
           requireNoAuth : function(Auth,$state){   
           return Auth.$requireSignIn().then(function(auth){
            $state.go('gift');
          },function(error){
            return;
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