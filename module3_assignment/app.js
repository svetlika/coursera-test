(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com/");


function FoundItemsDirective(){
  var ddo = {
    restrict: "E",
    templateUrl: 'foundItemsList.html',
    scope: {
      foundItems:'<',
      onRemove: '&',
      // isNothingFound:'<',
      msgText:'<',
      msgClass:'<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController:true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  // list.nothingIsFound = function() {
  //   return list.isNothingFound;
  // }

  list.showMessage = function() {
    if((list.msgText != '') && (list.msgClass != '')) {
      return true;
    } else {
      return false;
    }
  }

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;

  ctrl.found = [];
  ctrl.searchString = '';
  ctrl.nothingFound = false;
  //ctrl.showMessage = false;
  ctrl.msgText = '';
  ctrl.msgClass = '';

  ctrl.getMenuItems = function() {
    ctrl.found = [];
    ctrl.clearMessage();
    if(ctrl.searchString=="") {
      ctrl.nothingFound = true;
      ctrl.defineMessage('Please, enter the criteria for narrowing!','warning');
    } else {
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchString);

      promise.then(function(response) {
        ctrl.found = response;
        if(ctrl.found.length>0){
          ctrl.nothingFound = false;

        } else {
          ctrl.nothingFound = true;
          ctrl.defineMessage('Sorry, but there are nothing matching your criteria "'+ctrl.searchString+'" in the Menu.','info');
        }
        //console.log('promise response = ',response);
      })
      .catch(function(error){
      //  console.log('Something went wrong at controller when we tried to get menu items.');
        ctrl.defineMessage('Something went wrong when we tried to get menu items.','danger');

      });
    }

  };

  ctrl.clearMessage = function() {
    ctrl.msgText = '';
    ctrl.msgClass = '';
  }

  ctrl.defineMessage = function(text,bClass) {
    ctrl.msgText = text;
    ctrl.msgClass = bClass;
  };

  ctrl.removeItem = function (index) {
    ctrl.found.splice(index,1);
    if(ctrl.found.length==0) {
      ctrl.defineMessage('You successfully remove all items from the search results!','success');
    }
  }

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http,ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var lr_searchTerm = searchTerm.toLowerCase();
    var response = $http({
      method: "GET",
      url: (ApiBasePath + 'menu_items.json')
    }).then(function (result){
      // console.log('then result is ',result);
      var foundItems = [];
      for(var i=0; i < result.data.menu_items.length; i++) {
        var description = result.data.menu_items[i].description;
        var name = result.data.menu_items[i].name;
        if((description.toLowerCase().indexOf(lr_searchTerm) !== -1 )
          || (name.toLowerCase().indexOf(lr_searchTerm) !== -1))
        {
          foundItems.push(result.data.menu_items[i]);
        }
      }

      // console.log('foundItems: ',foundItems);
      return foundItems;
    });
    // .catch(function(error){
    //   console.log('Something went wrong at service when we asking for menu items. :-(');
    // });

    // console.log('searchTerm = ' + searchTerm);
    // console.log('lr_searchTerm = ' + lr_searchTerm);

    return response;

  };

}

})();
