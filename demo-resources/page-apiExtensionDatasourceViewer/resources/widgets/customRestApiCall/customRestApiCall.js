angular.module('org.bonitasoft.pagebuilder.widgets')
  .directive('customRestApiCall', function() {
    return {
      controllerAs: 'ctrl',
      controller: function WidgetrestApiCallController($scope,$http) {
    
    this.initData= function(){
     $scope.postPayload='{\n"param1":"abc",\n"param2":123,\n"param3":true\n}';
     $http({method:  'GET',url: '/bonita/API/system/session/1'})
            .success(function (data, status, headers, config) {
                $scope.apiToken= headers('X-Bonita-API-Token');
            });
    }
    
    this.callApi = function() {
         $scope.response={};
         
         var apiUrl= '/bonita/API/extension/' + $scope.properties.pathTemplate;
         if ($scope.properties.queryString){
             apiUrl+= "?"+ $scope.properties.queryString ;
         }
         
         $http({method:  $scope.properties.method, url: apiUrl, data: $scope.postPayload, headers:{'X-Bonita-API-Token':$scope.apiToken} })
            .success(function (data, status, headers, config) {
                $scope.response.respData = data;
                $scope.response.respStatus = status;
                $scope.response.respHeaders = headers('awesome header');
            })
            .error(function (data, status, headers, config) {
                $scope.response.respData = data;
                $scope.response.respStatus = status;
            });
        
    };
    
     this.clear = function() {
                $scope.response = null;
                
    };
        
    
    
},
      template: '<hr>\n<div ng-show="properties.method" ng-init="ctrl.initData()">\n    <h3>{{properties.description}}</h3>\n\n   <label class="control-label">REST API URL</label>\n        <pre>{{properties.method}} | /bonita/API/extension/{{properties.pathTemplate}}</pre>\n\n        <div ng-show="properties.queryString">\n            <label class="control-label">Query string</label>\n            <p>            \n                <input size="50" type="text" ng-show="properties.queryString" ng-model="properties.queryString">\n            </p>\n        </div>\n    \n    <div ng-show="properties.method==\'POST\'">\n        <label class="control-label">Json POST payload</label>\n        <p>\n            <textarea  ng-model="postPayload" style="width: 300px;height: 120px"></textarea>\n        </p>\n    </div>\n  \n   <div>\n       <p>\n        <input type="submit" class="btn btn-primary" ng-click="ctrl.callApi()">\n        <input type="button" class="btn btn-primary" ng-click="ctrl.clear()" value="Clear">\n        </p>\n    </div>\n    \n    <hr>\n    <div ng-show="response">\n\n        <label class="control-label">Status</label>\n        <pre>{{response.respStatus}}</pre>\n        \n        <label class="control-label">Returned data</label>\n        <pre>{{response.respData}}</pre>\n        \n        <label class="control-label" ng-show="response.respHeaders">Headers</label>\n        <pre ng-show="response.respHeaders">{{response.respHeaders}}</pre>\n\n    </div>\n    \n    \n</div>'
    };
  });
