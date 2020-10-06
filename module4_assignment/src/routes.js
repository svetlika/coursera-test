(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider) {
  //redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // Set UI States
  $stateProvider
  //home
  .state('home', {
    url: '/',
    templateUrl: 'src/home.template.html'
  })
  //menu categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/categories-list.template.html',
    controller: 'MenuAppController as myCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  //category items
  .state('items',{
    url: '/items/{categoryId}',
    templateUrl: 'src/category-items.template.html',
    controller: 'CategoryItemsController as category',
    params: {
      categoryId: null
    },
    resolve: {
      categoryData: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getCategoryData($stateParams.categoryId);
      }]
    }
  })
  //categories list 2
  .state('category',{
    url: '/category',
    templateUrl: 'src/category-list2.template.html',
    controller: 'CategoryList2Controller as catList2',
    resolve: {
      categories: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  //nested
  .state('category.items', {
    url: '/{categoryId},{categoryIndex}/items',
    templateUrl: 'src/category-items2.template.html',
    controller: 'CategoryItems2Controller as category2',
    params: {
      categoryId: null,
      categoryIndex: null
    },
    resolve: {
      items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }
  });

}

})();
