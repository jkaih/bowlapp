"use strict";window.BS_ENV="localhost:9000"===document.location.host?"dev":"prod",angular.module("bowlApp",["api.app","d3"]).config(["$routeProvider","$locationProvider","$httpProvider",function(a,b,c){delete c.defaults.headers.common["X-Requested-With"],b.html5Mode(!0),a.when("/",{templateUrl:"pages/home/home.html",controller:"MainCtrl"}).when("/people",{templateUrl:"pages/people/index.html",controller:"PeopleIndexController"}).when("/people/:id",{templateUrl:"pages/people/show.html",controller:"PeopleShowController"}).when("/bowls",{templateUrl:"pages/bowls/index.html",controller:"BowlsIndexController"}).when("/bowls/:id",{templateUrl:"pages/bowls/show.html",controller:"BowlShowController"}).otherwise({redirectTo:"/"})}]),angular.module("api.app",[]).service("$api",["$http","$q","$rootScope","$location","$window",function(a,b,c){c.environment=window.BS_ENV,"dev"===c.environment?c.api_host="http://localhost:3000/":"prod"===c.environment&&(c.api_host="http://hidden-cliffs-5922.herokuapp.com/"),this.call=function(){var d=Array.prototype.slice.call(arguments),e=c.api_host+d.shift().replace(/^\//,""),f="string"==typeof d[0]?d.shift():"GET",g="object"==typeof d[0]?d.shift():{},h="function"==typeof d[0]?d.shift():function(a){return a},i=b.defer(),j=function(a){i.resolve(h(a))};return"GET"===f?a.get(e,{params:g}).success(j):"HEAD"===f?a.head(e,{params:g}).success(j):"DELETE"===f?a.delete(e,{params:g}).success(j):"POST"===f?a.post(e,g,{}).success(j):"PUT"===f&&a.put(e,g,{}).success(j),i.promise},this.get_bowls=function(){return this.call("/bowls")},this.get_bowl=function(a){return this.call("/bowls/"+a)},this.get_people=function(){return this.call("/people")},this.get_person=function(a){return this.call("/people/"+a)}}]),angular.module("bowlApp").controller("MainCtrl",["$scope","$location","$api","$document",function(a,b,c){c.get_people().then(function(a){var b=$("#homepage-chart").width(),c=20,d=d3.scale.linear().domain([0,d3.max(a,function(a){return a.confidence_points})]).range([0,b]),e=d3.select("#homepage-chart").attr("width",b).attr("height",c*a.length),f=e.selectAll("g").data(a).enter().append("g").attr("transform",function(a,b){return"translate(0,"+b*c+")"});f.append("rect").attr("width",function(a){return d(a.confidence_points)}).attr("height",c-1),f.append("text").attr("x",function(a){return d(a.confidence_points)-3}).attr("y",c/2).attr("dy",".35em").text(function(a){return name=a.last_name?a.first_name+" "+a.last_name:a.first_name,name+"  -  "+a.confidence_points})})}]),angular.module("bowlApp").controller("NavBarController",["$scope","$location",function(a,b){a.active_tab=function(a){return"people"===a&&/^\/people$/.test(b.path())?"active":"home"===a&&/^\/$/.test(b.path())?"active":"bowls"===a&&/^\/bowls$/.test(b.path())?"active":void 0}}]),angular.module("bowlApp").controller("PeopleIndexController",["$scope","$api",function(a,b){b.get_people().then(function(b){a.people=b}),a.col="right_pick_count",a.reverse=!0,a.sortColumn=function(b){a.col=b,a.reverse=!a.reverse}}]),angular.module("bowlApp").controller("PeopleShowController",["$scope","$api","$routeParams",function(a,b,c){b.get_person(c.id).then(function(b){a.person=b})}]),angular.module("bowlApp").controller("BowlsIndexController",["$scope","$location","$api",function(a,b,c){c.get_bowls().then(function(b){a.bowls=b})}]),angular.module("bowlApp").controller("BowlShowController",["$scope","$api","$routeParams",function(a,b,c){b.get_bowl(c.id).then(function(b){a.bowl=b})}]),angular.module("d3",[]).service("d3Service",["$rootScope","$window","$q",function(a,b,c){console.log("FUCK YOU"),c.defer()}]);