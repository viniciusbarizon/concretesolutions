// Added here because the test was delivered at jsfiddle.
// Don't have space there for a tag head.
$(document).ready(function(){
	$('head').append("<base target='_blank'>");
});

myApp = angular.module('concreteChallengeApp', ['ui.bootstrap']);

myApp.controller('MainCtrl', ['$http', '$scope' , function($http, $scope) {
	var url;

	$scope.current_page = 1;

	$scope.get_shots = function() {
		url = 'http://api.dribbble.com/shots/popular?page=' + $scope.current_page +
			'&callback=JSON_CALLBACK';

		$http.jsonp(url)
			.success(function(data, status) {
		    	if(typeof $scope.items_per_page === 'undefined') {
			        $scope.items_per_page = data['per_page'];
			        $scope.num_pages = data['pages'];
			        $scope.total_items = data['total'];
		    	}

		    	$scope.shots = data.shots;
			})

			.error(function(data, status) {
	            console.log('Error: ' + status);
	        })
		;
	};
}]);

// Bootstrap Popover
myApp.directive('bsPopover', function() {
    return function(scope, element, attrs) {
		$("div[data-toggle=popover]").popover({
			html: true
	    }).on("mouseenter", function () {
	        var _this = this;
	        $(this).popover("show");
	        $(this).siblings(".popover").on("mouseleave", function () {
	            $(_this).popover('hide');
	        });
	    }).on("mouseleave", function () {
	        var _this = this;
	        setTimeout(function () {
	            if (!$(".popover:hover").length) {
	                $(_this).popover("hide")
	            }
	        }, 100);
	    });
    };
});

// Fallback for Image
myApp.directive('fallbackSrc', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			if(!attrs.ngSrc){
				element.attr('src', attrs.fallbackSrc);
			}
		}
	};
}); 