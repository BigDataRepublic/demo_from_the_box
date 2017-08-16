angular.module('app').controller('formController', function($scope, $http) {

    $scope.input;

    $scope.prediction = "";

	$http.get("http://localhost:5777/example_input").then(
        function(response) {
            console.log(response)
            http_code = response.status;
            if(http_code == 200) {
                console.log("request success")
                $scope.input = response.data;
            }
        },
        function(response){
            console.log("damn")
        });

    $scope.predict = function() {
        var request = JSON.stringify($scope.input)
        console.log(request)
    	$http.post("http://localhost:5777/predict", request).then(
	    function(response) {
	    	console.log(response)
	    	http_code = response.status;
	    	console.log(response.data)
	    	if(http_code == 200) {
	    		console.log("Upload success")
	    		$scope.prediction = response.data.prediction;
    			$scope.predicted = true;
	    	}
	    },
	    function(response){
            console.log(response)
	    	console.log("damn")
	    });
    }
 })