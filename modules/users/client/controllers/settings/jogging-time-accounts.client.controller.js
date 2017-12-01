(function () {
  'use strict';

  angular
    .module('users')
    .filter('matchAccessLevel', function() {
      return function( items, userMinLevel, userMaxLevel) {
        var filtered = [];
        angular.forEach(items, function(item) {
          if((userMinLevel <= new Date(item.date))&&(userMaxLevel >= new Date(item.date))) {
            filtered.push(item);
          }
        });
        return filtered;
      };
      console.log("sad");
    })
    .controller('JoggingTimeController', JoggingTimeController);

  JoggingTimeController.$inject = ['$scope', '$http', 'Authentication', 'UsersService', 'PasswordValidator', 'Notification'];

  function JoggingTimeController($scope, $http, Authentication, UsersService, PasswordValidator, Notification) {
    var vm = this;

    vm.refresh = refresh;
    vm.addInfo=addInfo;
    vm.remove=remove;
    vm.edit=edit;
    vm.update=update;
    vm.deselect=deselect;
    vm.user="";
    vm.showaverage=showaverage;
    vm.auth=Authentication;
    vm.from=new Date("1930-01-01");
    vm.to=new Date("2222-01-01");



    function refresh() {

      $http.get('/userlist').success(function(response) {
        console.log(response);
        response.sort(function(a,b){
          if( a.date <= b.date){
            return -1;
          }
          return 1;
        });

        vm.from=new Date(vm.from);
        vm.to=new Date(vm.to);

        vm.userlist =response;

      });
    }

    function  showaverage(){
      if(vm.user.time>0)
        vm.user.average=(vm.user.distance/vm.user.time).toString();
      return vm.user.average;
    }

    function addInfo() {
        $http.post('/userlist',vm.user).success(function(response) {
          //console.log(response);
          refresh();
        });
    }

    function remove(id) {

      $http.delete('/userlist/'+id).success(function(response){
        refresh();
      });
    }

    function edit(id) {

      $http.get('/userlist/'+id).success(function(response){
        console.log(response);
        vm.user=response;
        vm.user.date=new Date(response.date);
        refresh();
      });
    }

    function update() {

        $http.put('/userlist/'+vm.user._id,vm.user).success(function(response) {
          vm.user.date=new Date(response.date);
          refresh();
        });
    }

    function deselect() {

        vm.user="";
        refresh();
    }


    refresh();
  }
}());
