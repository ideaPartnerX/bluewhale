!function(e,t){"use strict";function n(t,n){e.module(t,n||[]),e.module(o).requires.push(t)}var o=t.name="dockerboard";t.dependencies=["ngResource","ngMaterial","ngAnimate","ui.router","prettyBytes","angular-loading-bar","angularMoment"],t.registerModule=n}(window.angular,window.dockerboardApp||(window.dockerboardApp={})),angular.module(dockerboardApp.name,dockerboardApp.dependencies).config(["$locationProvider","$urlRouterProvider",function(e,t){t.otherwise("/")}]).run(["$rootScope",function(e){e.$on("$stateChangeStart",function(){console.log("State Change: transition begins!")}),e.$on("$stateChangeSuccess",function(){console.log("State Change: State change success!")}),e.$on("$stateChangeError",function(){console.log("State Change: Error!")}),e.$on("$stateNotFound",function(){console.log("State Change: State not found!")}),e.$on("$viewContentLoading",function(){console.log("View Load: the view is loaded, and DOM rendered!")}),e.$on("$viewcontentLoaded",function(){console.log("View Load: the view is loaded, and DOM rendered!")})}]),angular.element(document).ready(function(){"#_=_"===window.location.hash&&(window.location.hash="#!")}),!function(){"use strict";dockerboardApp.registerModule("dockerboard.filters"),angular.module("dockerboard.filters").filter("sanitize",["$sce",function(e){return function(t){return t?e.trustAsHtml(t+""):""}}]).filter("escape",["$window",function(e){return function(t){return e.encodeURIComponent(e.encodeURIComponent(t))}}]).filter("unescape",["$window",function(e){return function(t){return t?e.decodeURIComponent(e.decodeURIComponent(t)):""}}]).filter("formatImageId",["limitToFilter",function(e){function t(t){return n.exec(t)?t:e(t,12)}var n=/[\-\:\.\/_]/;return t}])}(),!function(){dockerboardApp.registerModule("dockerboard.services")}(),!function(){"use strict";function e(e){return e&&e.replace(/%/g,"%25")}angular.module("dockerboard.services").factory("Menu",["$rootScope","$location",function(t,n){function o(){var t=!1,o=n.$$path;a.forEach(function(n){if(n&&n.url){var a=o.split("/"),s=a.slice(0,2).join("/");s===n.url&&(r.selectPage(e(a[2]),e(a[3])),r.selectSection(n),t=!0)}}),t||(r.selectPage(null,null),r.selectSection(null),r.breadcrumbs.length=0)}var r,a=[{name:"Dashboard",url:"/dashboard"},{name:"Containers",url:"/containers"},{name:"Images",url:"/images"},{name:"Hosts",url:"/hosts",tooltip:"Docker Hosts"},{name:"System",url:"/system",tooltip:"System Info"},{name:"Canvas",url:"/canvas"}];return t.$on("$locationChangeSuccess",o),r={sections:a,breadcrumbs:[],selectSection:function(e){r.currentSection=e,e?r.breadcrumbs[0]=e:r.breadcrumbs.length=0},toggleSelectSection:function(e){r.isSectionSelected(e)||r.selectSection(e)},isSectionSelected:function(e){return r.currentSection===e},selectPage:function(e,t){r.currentPage=e,r.currentPageSubSection=t,t?r.breadcrumbs[2]=t:r.breadcrumbs.length=2,e?r.breadcrumbs[1]=e:r.breadcrumbs.length=1},isPageSelected:function(e){return r.currentPage===e},breadcrumbUrl:function(e){var t=r.breadcrumbs.slice(0,e+1);return t.forEach(function(e,n){t[n]=e.url||e}),t.join("/")}}}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("Containers",["$resource",function(e){var t=e("/api/containers/:Id",{Id:"@Id"},{"delete":{method:"POST",headers:{"X-HTTP-Method-Override":"DELETE"},params:{force:!1,v:!1}}});return t.queryParams={all:!1,limit:"",size:!1,since:"",before:""},t.basicAttributes=["Id","Name","Created","Image"],t}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("ContainerActions",["$resource",function(e){var t=e("/api/containers/:Id/:action",{Id:"@Id",action:"@action"},{update:{method:"POST"},logs:{method:"GET",params:{action:"logs"},transformResponse:function(e){return{text:e}},isArray:!1}});return t.logsQueryParams={follow:!1,stdout:!0,stderr:!1,timestamps:!1,tail:"all"},t}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("Images",["$resource",function(e){var t=e("/api/images/:Id",{Id:"@Id"},{"delete":{method:"POST",headers:{"X-HTTP-Method-Override":"DELETE"},params:{force:!1,noprune:!1}}});return t.queryParams={all:!1,filters:""},t.basicAttributes=["Id","Author","Comment","DockerVersion","Architecture","Os","Size","VirtualSize","Created","Parent"],t}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("ImageActions",["$resource",function(e){var t=e("/api/images/:Id/:action",{Id:"@Id",action:"@action"},{update:{method:"POST"},history:{params:{action:"history"},isArray:!0}});return t}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("System",["$resource",function(e){var t=e("/api/system");return t}])}(),!function(){"use strict";angular.module("dockerboard.services").factory("Hosts",["$resource",function(e){var t=e("/api/hosts/:Id",{Id:"@Id"},{"delete":{method:"POST",headers:{"X-HTTP-Method-Override":"DELETE"}},save:{method:"POST"}});return t.CurrentHost=null,t.getCurrentHostUrl=function(e){return e=e||t.CurrentHost,e&&e.URL.Scheme+"://"+e.URL.Host},t}])}(),!function(){"use strict";dockerboardApp.registerModule("site.component"),angular.module("site.component").config(["$stateProvider",function(e){e.state("site",{url:"/",templateUrl:"/js/modules/site/views/index.tpl.html"})}])}(),!function(){"use strict";function e(e,t,n,o,r,a,s){function c(){e.closeMenu(),i&&i.focus()}e.menu=a;var i=document.querySelector('[role="main"]');r.$on("$locationChangeSuccess",c),e.closeMenu=function(){o(function(){n("left").close()})},e.openMenu=function(){o(function(){n("left").open()})},e.host=s.getCurrentHostUrl(),r.$on("$hostChangeSuccess",function(t,n){e.host=s.getCurrentHostUrl(n)}),e.path=function(){return t.path()},e.goHome=function(){e.menu.selectSection(null),e.menu.selectPage(null,null),t.path("/")}}dockerboardApp.registerModule("sidenav.component"),angular.module("sidenav.component").controller("SidenavCtrl",e),e.$inject=["$scope","$location","$mdSidenav","$timeout","$rootScope","Menu","Hosts"]}(),!function(){"use strict";function e(e,t,n){e.queryParams=angular.copy(t.queryParams),e.queryParams.host=n.getCurrentHostUrl(),e.fetch=function(){t.query(e.queryParams,function(t){e.containers=t})},e.fetch(),e.search=function(){e.fetch()},e.displayablePorts=function(e){for(var t=[],n=0,o=e.length;o>n;++n){var r=e[n];t.push(""===r.IP?r.PrivatePort+"/"+r.Type:r.IP+":"+r.PublicPort+"->"+r.PrivatePort+"/"+r.Type)}return t.join(", ")}}function t(e,t,a,s,c,i,u,l){function d(t){angular.forEach(u.basicAttributes,function(e){var n=t[e];if("Id"===e||"Image"===e){n=c(n,12);var o="#/";o+=("Id"===e?"containers/":"images/")+n,n='<a ng-href="'+o+'" href="'+o+'">'+n+"</a>"}else"Created"===e&&(n=i(n,!0));this.push({key:e,value:n})},e.basicAttributes)}u.get({Id:t.Id,host:l.getCurrentHostUrl()},function(t){d(t),e.container=t,e.containerShortId=c(t.Id,12)},function(e){404===e.status&&a.path("/containers")}),e.basicAttributes=[],e.toggleRunning=function(t){s.show({controller:o,templateUrl:"/js/modules/containers/views/container.running.dialog.tpl.html",locals:{parentScope:e},targetEvent:t}).then(function(t){e.container.State.Running=t,e.container.State[t?"StartedAt":"FinishedAt"]=Date.now()})},e.togglePaused=function(t){s.show({controller:r,templateUrl:"/js/modules/containers/views/container.paused.dialog.tpl.html",locals:{parentScope:e},targetEvent:t}).then(function(t){e.container.State.Paused=t})},e.destory=function(t){s.show({controller:n,templateUrl:"/js/modules/containers/views/container.destory.dialog.tpl.html",locals:{parentScope:e},targetEvent:t})}}function n(e,t,n,o,r){e.container=r.container,e.containerShortId=r.containerShortId,e.cancel=function(){n.cancel()},e.params={force:!1,v:!1},e.content="",e.ok=function(){o.delete({Id:e.containerShortId,force:e.params.force,v:e.params.v},null,function(){n.hide(),t.path("/containers")},function(o){return 404===o.status?(n.hide(),void t.path("/containers")):void(e.content=o.data)})}}function o(e,t,n,o,r){e.container=o.container,e.action=o.container.State.Running?"stop":"start",e.isRestart=!1,e.containerShortId=o.containerShortId,e.cancel=function(){n.cancel()},e.params={t:""},e.change=function(t){t?(e.preAction=e.action,e.action="restart"):e.action=e.preAction},e.content="",e.ok=function(){r.update({Id:e.containerShortId,action:e.action},e.params,function(){var t=!e.container.State.Running;"restart"==e.action&&(t=!0),n.hide(t)},function(t){if(304===t.status){var o=!e.container.State.Running;n.hide(o)}else e.content=t.data})}}function r(e,t,n,o,r){e.container=o.container,e.action=o.container.State.Paused?"unpause":"pause",e.isRestart=!1,e.containerShortId=o.containerShortId,e.cancel=function(){n.cancel()},e.content="",e.ok=function(){r.update({Id:e.containerShortId,action:e.action},function(){var t=!e.container.State.Paused;n.hide(t)},function(t){e.content=t.data})}}function a(e,t,n){e.containerShortId=t.Id,e.queryParams=n.logsQueryParams,e.fetch=function(t,o){var r=angular.copy(o,{});r.Id=t,n.logs(r,function(t){e.logs=t.text||""})},e.fetch(e.containerShortId,e.queryParams),e.search=function(){e.fetch(e.containerShortId,e.queryParams)},e.scrollToEnd=function(e){var t=angular.element(e.currentTarget).parent().parent()[0];t&&(t.scrollTop=t.scrollHeight)}}dockerboardApp.registerModule("containers.ctrl"),angular.module("containers.ctrl").controller("ContainersCtrl",e).controller("ContainerCtrl",t).controller("ContainerLogsCtrl",a).config(["$stateProvider",function(e){e.state("containers",{url:"/containers",templateUrl:"/js/modules/containers/views/containers.tpl.html"}).state("containeritem",{url:"/containers/:Id",templateUrl:"/js/modules/containers/views/container.tpl.html"}).state("containerLogs",{url:"/containers/{Id}/logs",templateUrl:"/js/modules/containers/views/container.logs.tpl.html"})}]),e.$inject=["$scope","Containers","Hosts"],t.$inject=["$scope","$stateParams","$location","$mdDialog","limitToFilter","amTimeAgoFilter","Containers","Hosts"],n.$inject=["$scope","$location","$mdDialog","Containers","parentScope"],o.$inject=["$scope","$location","$mdDialog","parentScope","ContainerActions"],r.$inject=["$scope","$location","$mdDialog","parentScope","ContainerActions"],a.$inject=["$scope","$stateParams","ContainerActions"]}(),!function(){"use strict";function e(e,t,n){function o(e){if(!e)return"";for(var t={},n=e.split(/\s+/g),o=0,r=n.length;r>o;++o){var a=n[o].split("=");if(2===a.length){var s=a[0],c=a[1];s&&c&&(t[s]=t[s]||[],t[s].push(c))}}return JSON.stringify(t)}e.queryParams=angular.copy(t.queryParams),e.queryParams.host=n.getCurrentHostUrl(),e.queryParamsFilters="",e.fetch=function(){e.queryParams.filters=o(e.queryParamsFilters),t.query(e.queryParams,function(t){e.images=t})},e.fetch(),e.search=function(){e.fetch()},e.getRepo=function(e){var t="";return e.length&&(t=e[0].split(":")[0]),t},e.getTags=function(e){var t=[];return angular.forEach(e,function(e){var t=e.split(":")[1];t&&this.push(t)},t),t.join(", ")}}function t(e,t,o,r,a,s,c,i,u,l){function d(t){angular.forEach(i.basicAttributes,function(e){var n=t[e];if("Id"===e||"Parent"===e){n=a(n,12);var o="#/images/"+n;n='<a ng-href="'+o+'" href="'+o+'">'+n+"</a>"}else"Size"===e||"VirtualSize"===e?n=c(n):"Created"===e&&(n=s(n,!0));this.push({key:e,value:n})},e.basicAttributes)}o.Id=o.Id.replace(/%(25)/g,"%").replace(/\//g,"%2F"),e.tabs=[{title:"Normal"},{title:"Base"}],e.basicAttributes=[],i.get({Id:o.Id,host:l.getCurrentHostUrl()},function(t){d(t),e.image=t,e.imageShortId=a(t.Id,12)},function(e){404===e.status&&t.path("/images")}),e.destory=function(t){r.show({controller:n,templateUrl:"/js/modules/images/views/image.destory.dialog.tpl.html",locals:{image:e.image,imageShortId:e.imageShortId},targetEvent:t})}}function n(e,t,n,o,r,a,s){e.image=r,e.imageShortId=a,e.cancel=function(){n.cancel()},e.params={force:!1,noprune:!1},e.content="",e.ok=function(){o.delete({Id:e.imageShortId,force:e.params.force,noprune:e.params.noprune,host:s.getCurrentHostUrl()},null,function(){e.cancel(),t.path("/images")},function(n){return 404===n.status?(e.cancel(),void t.path("/images")):void(e.content=n.data)})}}function o(e,t,n,o){e.imageShortId=t.Id,n.history({Id:e.imageShortId,host:o.getCurrentHostUrl()},function(t){e.commits=t},function(){})}dockerboardApp.registerModule("images.ctrl"),angular.module("images.ctrl").controller("ImagesCtrl",e).controller("ImageCtrl",t).controller("ImageHistoryCtrl",o).config(["$stateProvider",function(e){e.state("images",{url:"/images",templateUrl:"/js/modules/images/views/images.tpl.html"}).state("imageItem",{url:"/images/{Id}",templateUrl:"/js/modules/images/views/image.tpl.html"}).state("imageHistory",{url:"/images/{Id}/history",templateUrl:"/js/modules/images/views/image.history.tpl.html"})}]),e.$inject=["$scope","Images","Hosts"],t.$inject=["$scope","$location","$stateParams","$mdDialog","limitToFilter","amTimeAgoFilter","prettyBytesFilter","Images","ImageActions","Hosts"],n.$inject=["$scope","$location","$mdDialog","Images","image","imageShortId","Hosts"],o.$inject=["$scope","$stateParams","ImageActions","Hosts"]}(),!function(){"use strict";function e(e,t){t.get(function(t){e.system=t,console.log(e.system)})}dockerboardApp.registerModule("system.ctrl"),angular.module("system.ctrl").controller("SystemCtrl",e).config(["$stateProvider",function(e){e.state("system",{url:"/system",templateUrl:"/js/modules/system/views/system.tpl.html"})}]),e.$inject=["$scope","System"]}(),!function(){"use strict";function e(e,n,o,r){function a(t){for(var n=!1,o=0,r=e.hosts.length;r>o;o++){var a=e.hosts[o];if(a.URL.Scheme===t.URL.Scheme&&a.URL.Host===t.URL.Host){e.hosts[o]=t,n=!0;break}}n||e.hosts.push(t)}r.query(function(t){e.hosts=t}),e.selectedIndex=0,e.select=function(t){e.selectedIndex=t,r.CurrentHost=e.hosts[t],n.$emit("$hostChangeSuccess",r.CurrentHost)},e.create=function(e){o.show({controller:t,templateUrl:"/js/modules/hosts/views/hosts.create.dialog.tpl.html",targetEvent:e}).then(function(e){a(e)})},e.destroy=function(t){r.delete({Id:encodeURIComponent(r.getCurrentHostUrl(e.hosts[t]))},function(){e.hosts.splice(t,1)})}}function t(e,t,n){e.cancel=function(){t.cancel()},e.name="",e.host="",e.content="",e.ok=function(){e.host||e.cancel(),n.save({name:e.name,host:e.host},function(e){t.hide(e)},function(t){e.content=t})}}dockerboardApp.registerModule("hosts.ctrl"),angular.module("hosts.ctrl").controller("HostsCtrl",e).config(["$stateProvider",function(e){e.state("hosts",{url:"/hosts",templateUrl:"/js/modules/hosts/views/hosts.tpl.html"})}]),e.$inject=["$scope","$rootScope","$mdDialog","Hosts"],t.$inject=["$scope","$mdDialog","Hosts"]}(),!function(){"use strict";function e(e){e.addNode=function(){alert("add node")}}dockerboardApp.registerModule("canvas"),angular.module("canvas").controller("CanvasCtrl",e).config(["$stateProvider",function(e){e.state("canvas",{url:"/canvas",templateUrl:"/js/modules/canvas/views/canvas.tpl.html"})}]),e.$inject=["$scope","$rootScope"]}();