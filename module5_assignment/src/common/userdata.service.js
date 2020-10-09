(function () {
"use strict";

angular.module('common')
.service('UserDataService', UserDataService);


UserDataService.$inject = ['$http', 'ApiPath'];
function UserDataService($http, ApiPath) {
  var service = this;

  var userData = {
    first_name:'',
    last_name:'',
    email:'',
    phone:'',
    dish_code:'',
    dish_data:{},
    registered:false
  };

 service.isUserRegistered = function(){
   return userData.registered;
 };

 service.getUserFirstName = function() {
   return userData.first_name;
 };

 service.getUserLastName = function() {
   return userData.last_name;
 };

 service.getUserEmail = function() {
   return userData.email;
 };

 service.getUserPhone = function() {
   return userData.phone;
 };

 service.getUserFavouriteDishCode = function() {
   return userData.dish_code;
 };

 service.registerUser = function (firstName, lastName, email, phone, dish) {
   userData.first_name = firstName;
   userData.last_name = lastName,
   userData.email = email;
   userData.phone = phone;
   userData.dish_code = dish;
   userData.registered = true;

   return true;
 };

 service.getItemData = function (item_code) {
   return $http({
     method: "GET",
     url: (ApiPath + '/menu_items/'+ item_code.toUpperCase() + '.json')
   }).then(function (result){
           //  console.log('Server is answered with data: ', result.data);
             return result.data;
   });
 }

}



})();
