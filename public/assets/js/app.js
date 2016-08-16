var ref = new Firebase('https://gf-chat.firebaseio.com/players');
ref.on("value", function(snapshot) {
	snapshot.forEach(function(data){
		console.log("The " + data.key() + " dinosaur's score is " + data.val());
	}); 	
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
