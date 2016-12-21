// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'signup', 'login', 'dashboard', 'addZameen'])
    .controller("appController", ['$scope', appController])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "views/login/login.html",
                controller: "loginController"
            })
            .state("signup", {
                url: "/signup",
                templateUrl: "views/signup/signup.html",
                controller: "signupController"
            })
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "views/dashboard/dashboard.html",
                controller: "dashboardController"
            })
            .state("addZameen", {
                url: "/addZameen",
                templateUrl: "views/addZameen/addZameen.html",
                controller: "addZameenController"
            })


        // .state("salemansInMaps", {
        //     cache: false, // controller will terminate on state change and not keep running
        //     url: "/adminDashboard/salemansInMaps",
        //     templateUrl: "views/salemansInMaps/salemansInMaps.html",
        //     controller: "salemansInMapsController"
        // }); 

        $urlRouterProvider.otherwise("/login");
    })
    .service("unversalFunctionsService", function ($state, $ionicHistory, $ionicPopup, $ionicLoading, $http) {
        var vm = this;


        vm.url = "https://agricultureapp.herokuapp.com";

        //////////////////////////////////////////////////////////////////////////////////////
        this.showLoading = function (text) {
            $ionicLoading.show({
                template: text
            });
        };
        this.hideLoading = function () {
            $ionicLoading.hide();
        };
        this.showAlert = function (title, template) {
            $ionicPopup.alert({
                title: title,
                template: template
            });
        };

        this.showConfirm = function (title, template, onTrue, onFalse) {


            var confirmPopup = $ionicPopup.confirm({
                title: title,
                template: template

            }).then(function (res) {
                if (res) {
                    onTrue();
                } else {
                    onFalse();
                }
            });
        };



        //////////////////////////////////////////////////////////////////////////////////////

        this.clearCredentials = function () {

            console.log("clear");
            localStorage.clear();//clear all entry of localstorage
            /*
             disableAnimate: Do not animate the next transition.
             disableBack: The next view should forget its back view, and set it to null.
             historyRoot: The next view should become the root view in its history stack.
             */
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
            $state.go("login", {}, { reload: true });
        };

        ///////////////////////////////////////////////////////////////////////////////
        this.notLoggedIn = function () { //recommend:this function only call if any request end with error.status==401, not on controller load
            currentView = $ionicHistory.currentStateName();

            if (currentView != "home" && currentView != "login" && currentView != "signup") {

                vm.showAlert("Login First", "it look like you are not logged in or your session is expired");
                localStorage.setItem("token", "");//if token is garbage or expired it is removing
                $ionicHistory.nextViewOptions({
                    disableBack: true,
                    historyRoot: true
                });
                $state.go("login");
            }
        };
        //////////////////////////////////////////////////////////////////////////////////////
        this.loggedIn = function () {
            if ($ionicHistory.currentStateName() != "adminDashboard") {
                $state.go("adminDashboard");
            }
        };

        //////////////////////////////////////////////////////////////////////////////////
        this.isLoggedIn = function () { //recommend:this function will only call on load of login-page-controller, not admindashboard

            if (localStorage.getItem("token")) {

                console.log("checking isLoggedIn...");

                $http.get("/v1/isLoggedIn").then(function (res) {

                    console.log("isLoggedIn response", res);
                    if (res.data.isLoggedIn) { // it means user is loged in
                        vm.loggedIn();
                    } else {
                        vm.notLoggedIn();
                    }
                });
            }
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////


    })//service ended

function appController($scope) {

}



