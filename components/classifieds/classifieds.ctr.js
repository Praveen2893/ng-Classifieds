(function(){
	"use strict";
	angular.module("ngClassifieds")
	.controller("classifiedsCtrl",function($scope,$http,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog,$state){


		var vm = this;
		vm.openSideBar = openSideBar;
		vm.closeSidebar = closeSidebar;
		vm.saveClassified = saveClassified;
		vm.editClassified = editClassified;
		vm.saveEdit = saveEdit;
		vm.deleteClassified = deleteClassified;

		vm.classifieds = classifiedsFactory.ref; 
		vm.categories; 
		vm.editing;
		vm.classified;

		vm.classifieds.$loaded().then(function(classifieds){
				vm.categories = getCategories(classifieds);
				vm.a = vm.categories;
		});

	      var contact = {
	        name: "Ryan Chenkie", 
	        phone: "(555) 555-5555",
	        email: "ryanchenkie@gmail.com"
	      }

	      function showToast(message) {
	        $mdToast.show(
	          $mdToast.simple()
	            .content(message)
	            .position('top, right')
	            .hideDelay(3000)
	        );
	      }

	      $scope.$on('newClassified',function(event,data){
	      		vm.classifieds.$add(data);
	      		showToast('Classified saved!');
	      });
	      $scope.$on('editClassified',function(event,data){
	      		showToast(data);
	      });
	      function openSideBar() {
	        $state.go('classifieds.new');
	      }

	      function closeSidebar() {
	        vm.classified = {};
	        $mdSidenav('left').close();
	      }

	      function saveClassified(classified) {
	        if(classified) {
	          classified.contact = contact;
	          vm.classifieds.push(classified);
	          vm.classified = {};
	          closeSidebar();
	          showToast('Classified Saved');
	        }
	      }

	      function editClassified(classified) {
	       		$state.go('classifieds.edit',{
	       			id: classified.$id,
	       		})
	      }

	      function saveEdit() {
	        vm.editing = false;
	        // Need to clear the form after, or else it will be populated when we go to add new classifieds
	        vm.classified = {};
	        $mdSidenav('left').close();
	        showToast('Edit Saved');
	      }

	      function deleteClassified(classified) {
	        var confirm = $mdDialog.confirm()
	            .title('Are you sure you want to delete ' + classified.title + '?')
	            .ok('Yes')
	            .cancel('No');
	        $mdDialog.show(confirm).then(function() {
	          vm.classifieds.$remove(classified);
	          showToast('Classified Deleted');
	        });
	      };

	  
	    
	    function getCategories(classifieds) {

	        var categories = [];

	        angular.forEach(classifieds, function(ad) {
	          angular.forEach(ad.categories, function(category) {
	            categories.push(category);
	          });
	        });

	        return _.uniq(categories);
	      }

});

})();