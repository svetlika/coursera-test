(function(){
'use strict';

angular.module('common')
.directive('itemexists',ItemExistsDirective);

ItemExistsDirective.$inject = ['$http','$q','ApiPath'];
function ItemExistsDirective($http, $q, ApiPath){
  var ddo = {
    restrict: "A",
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.itemexists = function(modelValue, viewValue){
        console.log('modelValue', modelValue);

        if(ctrl.$isEmpty(modelValue)) {
        //  console.log('consider empty model valid');
          return $q.when();
        }

        var http = $http({
          method: "GET",
          url: (ApiPath + '/menu_items/'+ modelValue.toUpperCase() + '.json')
        }).then(function (result){
                //  console.log('Server is answered with data: ', result.data);
                  return $q.resolve();
                },
                function (result){
                //  console.log('Server return an Error: ', result);
                  return $q.reject();
        });

        return http;

      }
    }
  };

  return ddo;
}

})();
