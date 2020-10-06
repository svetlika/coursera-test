(function() {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);

// CategoryItemsController.$inject = ['MenuDataService', 'items'];
CategoryItemsController.$inject = ['MenuDataService', 'categoryData'];
function CategoryItemsController(MenuDataService, categoryData) {
  var category = this;
  // category.items = items;
  category.categoryData = categoryData;//.category;
  // category.items = categoryData.menu_items;
  // console.log('category.categoryData', category.categoryData);
}

})();
