/**
 * Created by 205 on 1/28/2016.
 */
(function () {

    angular.module("login", [])

        .controller("loginController", ['$scope', '$http', '$state', '$ionicHistory', 'unversalFunctionsService', loginController]);


    function loginController($scope, $http, $state, $ionicHistory, unversalFunctionsService) {

        unversalFunctionsService.isLoggedIn();

        $scope.loginObject = {};/////this is an empty object for store login information

        $scope.doLogin = function () {/////////////////doLogin start here/////////////////////////////////////

            unversalFunctionsService.showLoading("Singing in...");//show loading screen

            $http({///////////send login request to server with login information in body
                method: "post",
                url: unversalFunctionsService.url + "/v1/login",

                // this is login information pattern which is required by api
                //  {
                //    email : "string",
                //    password : "string"
                //
                //  }
                data: {
                    email: $scope.loginObject.email,
                    password: $scope.loginObject.password
                }

            }).then(function (response) {

                if (response.data.success) {
                    console.log(response.data);
                    localStorage.setItem("email", response.data.data.email);
                    localStorage.setItem("password", $scope.loginObject.password);
                    localStorage.setItem("_id", response.data.data._id);

                    unversalFunctionsService.hideLoading();

                    $ionicHistory.nextViewOptions({
                        disableBack: true,
                        historyRoot: true
                    });
                    $state.go("dashboard", {}, { reload: true });


                } else {
                    unversalFunctionsService.hideLoading();
                    console.log(response.data.message);
                    unversalFunctionsService.showAlert("Login Failed !!", response.data.message);
                }

            }, function (error) {
                console.log(error);
                unversalFunctionsService.hideLoading();
                unversalFunctionsService.showAlert("Login Failed !!", "check your email & password or contact support if not resolved ");

            });

        };/////////////dologin ended here////////////////////////////


    }/////controller ended here//////////////////////////

})();








