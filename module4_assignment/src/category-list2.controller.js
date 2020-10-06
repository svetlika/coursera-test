(function() {
'use strict';

angular.module('MenuApp')
.controller('CategoryList2Controller', CategoryList2Controller);

CategoryList2Controller.$inject = ['MenuDataService', 'categories'];
function CategoryList2Controller(MenuDataService, categories) {
  var catList2 = this;
  catList2.categories = categories;
}

})();
