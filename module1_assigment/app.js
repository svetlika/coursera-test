(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LCController', LCController);

LCController.$inject = ['$scope'];
function LCController($scope) {
  //$scope.test = "Just for test.";
  $scope.lunchMenu = "";
  $scope.verdict = "";
  $scope.flag = false;
  $scope.msgColor = "clr-none";

  $scope.defineVerdict = function() {
    var strVerdict = "I'm not ready yet.";
    var strMenu = $scope.lunchMenu;
    var msgClass = "clr-none";
    if(strMenu=="") {
      cntItems = 0;
    } else {
      var menuItems = strMenu.split(",");
      var cntItems = countItems(menuItems,$scope.flag);
    }


    if(cntItems==0) {
      strVerdict = "Please enter data first.";
      msgClass = "clr-red";
    } else if (cntItems < 4) {
      strVerdict = "Enjoy!";
      msgClass = "clr-green";
    } else {
      strVerdict = "Too much!";
      msgClass = "clr-green";
    }

    $scope.verdict = strVerdict;
    $scope.msgColor = msgClass;
  }

  function countItems(myArr,myFlag) {
    var cntItems = 0;
    if(myFlag==true){
      for(var i=0;i<myArr.length;i++){
        if(myArr[i].trim()!="") cntItems++;
      }
    } else {
      cntItems = myArr.length;
    }
    return cntItems;
  }


}

})();
