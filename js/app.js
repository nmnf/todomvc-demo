(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var myapp = angular.module('MyTodoMvc',[]);
	var mycontroller = myapp.controller('MainController',['$location','$scope',function($location,$scope){
		//文本框需要一个模型
		$scope.text = '';
		
		//任务列表也需要一个
			//每个人物的结构{id:1,text:'study',complete:true}
		$scope.todos = [
			{id:1,text:'study',completed:true},
			{id:2,text:'play',completed:false},
			{id:3,text:'jump',completed:true}
		];

		//添加todo
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				id:Math.random(),
				text:$scope.text,
				completed:false,
			});
			
			$scope.text = "";
		};
		//删除
		$scope.remove = function(id){
			//删除谁
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					$scope.todos.splice(i,1);
					break;
				}
			}
		};
		//清空已完成任务
		$scope.clear=function(){
			var result = [];
			for(var i=0;i<$scope.todos.length;i++){
				if(!$scope.todos[i].completed){
					result.push($scope.todos[i]);
				}
			}
			$scope.todos = result;
		};
		//
		$scope.existCompleted=function(){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		};
		//当前正在编辑谁
		$scope.currentEditingId =-1;
		$scope.editing=function(id){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id&&!$scope.todos[i].completed){
					$scope.currentEditingId=id;
					break;
				}
			}
			
		};
		$scope.save=function(){
			$scope.currentEditingId=-1;
		};
		// $scope.checkall=false;
		// $scope.$watch('checkall',function(now,old){
		// 	for(var i=0;i<$scope.todos.length;i++){
		// 		$scope.todos[i].completed=now;
		// 	}
		// })
		var now = false;
		$scope.toggleAll=function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed=now;
			}
			now=!now;
		};
		$scope.selector = {};


		$scope.$location=$location;
		 $scope.$watch('$location.hash()', function(now, old) {
      	// 1. 拿到锚点值
      	// 这样写就要求执行环境必须要有window对象
      	// var hash = window.location.hash;
      	
      	// 2. 根据锚地值对selector做变换
	      switch (now) {
	        case '/active':
	          $scope.selector = { completed: false };
	          break;
	        case '/completed':
	          $scope.selector = { completed: true };
	          break;
	        default:
	          $scope.selector = {};
	          break;
	      }
    });
		 $scope.equalCompare = function(source,target){
		 	return source===target;
		 };
	}]);
})(angular);
