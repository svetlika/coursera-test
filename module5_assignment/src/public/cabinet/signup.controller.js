(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserDataService'];
function SignupController(UserDataService) {
  var $ctrl = this;

  $ctrl.user = {};

  $ctrl.user.registered = UserDataService.isUserRegistered();

  $ctrl.user.FirstName = UserDataService.getUserFirstName();
  $ctrl.user.LastName = UserDataService.getUserLastName();
  $ctrl.user.Email = UserDataService.getUserEmail();
  $ctrl.user.Phone = UserDataService.getUserPhone();
  $ctrl.user.Dish = UserDataService.getUserFavouriteDishCode();

  if($ctrl.user.registered) {
    $ctrl.submitName = 'Save Changes';
  } else {
    $ctrl.submitName = 'Sign Up';
  }

  $ctrl.SuccessMsg = 'Your information has been saved. Click "My Info" button for checking, what have we saved.'
  $ctrl.showMessage = false;

  $ctrl.submit = function() {
    var userRegistered = UserDataService.registerUser($ctrl.user.FirstName,$ctrl.user.LastName,$ctrl.user.Email,$ctrl.user.Phone,$ctrl.user.Dish);
    if(userRegistered) {
      $ctrl.submitName = 'Save Changes';
      $ctrl.showMessage = true;
    }
  }

}

})();
