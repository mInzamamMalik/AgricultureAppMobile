(function () {
    angular.module("addZameen", [])

        .controller("addZameenController", function ($scope, $http, $state, unversalFunctionsService) {
            $scope.newZameenObject = {};

            $scope.addZameen = function () {// when user click on signup this function execute

                unversalFunctionsService.showLoading("Signing up..."); // show loding until signup success or fail

                $http({ // this line will send signup request to server with an object in request body
                    method: "post",
                    url: unversalFunctionsService.url + "/v1/addZameen",
                    data: {
                        title: $scope.newZameenObject.title,
                        location: $scope.newZameenObject.location,
                        landLord: localStorage.getItem("_id")
                    }
                }).then(
                    function (response) { //this function execute on signup response
                        console.log("res: ", response.data);
                        unversalFunctionsService.hideLoading();//hide loading as signup response is arrived


                        if (response.data.success) { //on signup success
                            unversalFunctionsService.showAlert("Zameen added successfully", "view all zameen on dashboard");
                            $scope.newZameenObject = {};

                        } else { //on signup fail
                            unversalFunctionsService.showAlert("Adding zameen Failed !!", response.data.message);
                        }

                    },
                    function (error) {// this function execute when unable to send request
                        console.log("error: ", error);
                        unversalFunctionsService.hideLoding();//hide loding as unable to send loding
                        unversalFunctionsService.showAlert("Unknown Error !!", "check you internet connection or check log for technical detail");
                    });
            };
        })
})();