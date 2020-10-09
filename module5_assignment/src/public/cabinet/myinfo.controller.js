(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['UserDataService'];
function MyInfoController(UserDataService) {
  var $ctrl = this;

  $ctrl.user = {};
  $ctrl.dish = {};

  $ctrl.user.registered = UserDataService.isUserRegistered();

  $ctrl.user.FirstName = UserDataService.getUserFirstName();
  $ctrl.user.LastName = UserDataService.getUserLastName();
  $ctrl.user.Email = UserDataService.getUserEmail();
  $ctrl.user.Phone = UserDataService.getUserPhone();
  $ctrl.user.Dish = UserDataService.getUserFavouriteDishCode();

  if ($ctrl.user.registered) {
    var promise = UserDataService.getItemData($ctrl.user.Dish);
    promise.then(function(response) {
      $ctrl.dish = response;
      console.log('promise response = ',response);
    })
    .catch(function(error){
      console.log('Something went wrong at controller when we tried to get item data.');
    //  $ctrl.defineMessage('Something went wrong when we tried to get menu items.','danger');
    });
  }
}

})();
