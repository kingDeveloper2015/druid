'use strict'

var myApp = angular.module('myApp',['angularCharts']);
myApp.controller('myCtrl',function($http,$scope){
	$scope.chartType = 'bar';
	$scope.config = {
		labels: false,
		title: "Products",
		legend: {
			display: true,
			position: 'left'
		},
		innerRadius: 0
	};
	$http({method: 'GET',
	url: 'http://localhost:3000/druid'}).then(function(res){
		for(var i=0;i<res.data.length;i++){
			//$scope.data['series'].push(res.data[i]["event"]["language"]);
			$scope.data.data.push({x:res.data[i]["event"]["language"] , y:[res.data[i]["event"]["rows1"]]})
			console.log(res.data[i]["event"]["language"]);
		}
		console.log(res.data.length);
		console.log(res);
	},function(res){
		console.log(res);
	});
	
	$scope.data = {
		
		data: []
	};
});