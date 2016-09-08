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
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/auth/register.html',
      })
      .state('chatbox', {
        url: '/chatbox',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'views/chat/chatbox.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/auth/login.html',
      })
          .state('profile', {
        url: '/profile',
        templateUrl: 'views/auth/profile.html',
      })
          .state('gift', {
        url: '/gift',
        templateUrl: 'views/post/gift.html',
      })
           .state('freebie', {
        url: '/freebie',
        templateUrl: 'views/post/freebie.html',
      })
      	$urlRouterProvider.otherwise('/');
       })
      .constant('FirebaseUrl', 'https://gf-chat.firebaseio.com');