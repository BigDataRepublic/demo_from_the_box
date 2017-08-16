angular.module('app', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
   .when('/', {
    templateUrl: 'partials/form.html',
    controller: 'formController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
  });
});