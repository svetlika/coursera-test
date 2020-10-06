(function(){
'use strict';

angular.module('Data')
.service('MenuDataService',MenuDataService);

MenuDataService.$inject = ['$http','ApiBasePath'];
function MenuDataService($http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + 'categories.json')
    }).then(function (result){
      console.log('http (getAllCategories) -> then result is ',result);
      //var foundItems = [];
      //for(var i=0; i < result.data.menu_items.length; i++) {
      var categories = result.data;
      return categories;
    });

    return promise;

  }

  service.getItemsForCategory = function(categoryShortName) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + 'menu_items.json'),
      params:{'category':categoryShortName
      }
    }).then(function(result){
      console.log('http (getItemsForCategory) -> then result is ',result);
      // var menuItems = result.data.menu_items;
      // return menuItems;
      var categoryItems = result.data.menu_items;
      return categoryItems;
    });

    return promise;

  }

  service.getCategoryData = function(categoryShortName) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + 'menu_items.json'),
      params:{'category':categoryShortName
      }
    }).then(function(result){
      console.log('http (getItemsForCategory) -> then result is ',result);
      // var menuItems = result.data.menu_items;
      // return menuItems;
      var categoryData = result.data;
      return categoryData;
    });

    return promise;

  }

}

})();
