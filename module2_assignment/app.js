(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getItemsToBuy();

  list1.buyItem = function(itemIndex){
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getItemsAlreadyBought();
}

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
    {name:'Milk',quantity:2},
    {name:'Crackers',quantity:3},
    {name:'Butter',quantity:1},
    {name:'Sweets',quantity:4},
    {name:'Flowers',quantity:5},
    {name:'Sugar',quantity:1},
  ];
  var itemsAlreadyBought = [];

  service.getItemsToBuy = function() {
    return itemsToBuy;
  }

  service.getItemsAlreadyBought = function() {
    return itemsAlreadyBought;
  }

  service.buyItem = function (itemIndex) {
    var boughtItem = itemsToBuy.splice(itemIndex,1);
    itemsAlreadyBought.push(boughtItem[0]);
  }

}

})();
