(function() {
'use strict';

angular.module('MenuApp')
.controller('CategoryItems2Controller', CategoryItems2Controller);

// CategoryItemsController.$inject = ['MenuDataService', 'items'];
CategoryItems2Controller.$inject = ['MenuDataService', 'items', '$stateParams', 'categories'];
function CategoryItems2Controller(MenuDataService, items, $stateParams, categories) {
  var category2 = this;
  // category.items = items;
  category2.items = items;//.category;
  // category.items = categoryData.menu_items;
  // console.log('category.categoryData', category.categoryData);
  var selected_category = categories[$stateParams.categoryIndex];
  console.log('selected_category', selected_category);
  console.log('categories', categories);
  category2.name = selected_category.name;
  category2.short_name = selected_category.short_name;
  category2.special_instructions = selected_category.special_instructions;

}

})();
