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
      .state('gift', {
        url: '/gift',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/post/gift.html'
      })
           .state('freebie', {
        url: '/freebie',
        templateUrl: 'views/post/freebie.html',
      })
          .state('chat', {
        url: '/chat',
        templateUrl: 'views/chat/chat.html',
      })
      	$urlRouterProvider.otherwise('/');
       })
      .constant('FirebaseUrl', 'https://gf-chat.firebaseio.com');