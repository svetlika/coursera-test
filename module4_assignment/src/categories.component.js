(function() {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/categories.template.html',
  bindings: {
    categories: '<'
  }
});

})();
