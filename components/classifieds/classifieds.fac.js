(function(){

	angular.module("ngClassifieds")
	.factory("classifiedsFactory",function($http,$firebaseArray){

		// var ref = new firebase('https://ngclassifieds-b763c.firebaseio.com/');

		 var config = {
		    apiKey: "AIzaSyAvF3N2N9jFtS-PTpNWa5nKnci-BdXIJdI",
		    authDomain: "ngclassifieds-b763c.firebaseapp.com",
		    databaseURL: "https://ngclassifieds-b763c.firebaseio.com",
		    projectId: "ngclassifieds-b763c",
		    storageBucket: "ngclassifieds-b763c.appspot.com",
		    messagingSenderId: "511165190107"
		  };
  		firebase.initializeApp(config);
  		
        var rootRef = firebase.database().ref();
		return {
			ref: $firebaseArray(rootRef)
		}
	})

})();