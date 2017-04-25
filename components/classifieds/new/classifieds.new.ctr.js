(function(){

"use strict";

	angular
	.module('ngClassifieds')
	.controller('newClassifiedsCtrl',function($scope,$mdSidenav,$state,$timeout,$mdDialog){

			var vm = this;
			vm.closeSidebar = closeSidebar;
			vm.saveClassified = saveClassified;
			$timeout(function() {
				$mdSidenav('left').open();
			});

			$scope.$watch('vm.sideNavOpen',function(sidenav){
				if(sidenav === false){
					$mdSidenav('left')
						.close()
						.then(function(){
							$state.go('classifieds');
						})
				}
			});

			function closeSidebar(){
				vm.sideNavOpen = false;
			}

			function saveClassified(classified) {
				if(classified){
					classified.contact = {
						        name: "Ryan Chenkie", 
						        phone: "(555) 555-5555",
						        email: "ryanchenkie@gmail.com"
						      };
					$scope.$emit('newClassified',classified);
					closeSidebar();
				}
				
			}
	});
})();