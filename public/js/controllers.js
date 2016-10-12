'use strict';

/* Controllers */

var controllers = angular.module('wedding.Controllers', []);

controllers.controller('MainCtrl', ['$scope', '$timeout', '$interval', '$http', '$sce', function($scope, $timeout, $interval, $http, $sce) {
    $scope.showModal = false;
    $scope.categorySelected = '';
    $scope.headerBackground = '';
    $scope.formData = {};
    $scope.confirmed = false;

    $scope.weddingDate = new Date(2015, 5, 13, 19, 30, 0, 0);

    $scope.categories = {
        history: {
            title: "Nuestra historia",
            url: 'partials/invitacion.html'
        },
        location: {
            title: "La Garriga de Castelladral",
            url: 'partials/garriga.html'
        },
        playlist: {
            title: "Sin definir",
            url: 'partials/playlist.html'
        },
        countdown: {
            title: "Cuenta atrás",
            url: 'partials/invitacion.html'
        },
        acomodation: {
            title: "Donde alojarte",
            url: 'partials/invitacion.html'
        },
        confirmation: {
            title: "Contamos contigo!",
            url: 'partials/invitacion.html'
        }
    };

    $scope.showCategory = function(category) {
        $scope.categorySelected = category;
        $scope.title = $scope.categories[category].title;
        $scope.url = $scope.categories[category].url;
        $scope.showModal = true;
        $scope.headerBackground = "header_garriga";
    };

    $scope.closeModal = function() {

    }

    $scope.test = function() {
        $scope.showModal = false;
    }

    $scope.sendForm = function() {
        if ($scope.joinForm.$valid) {
            if (confirm("¿Estas seguro que quieres venir a nuestra boda?")) {
                console.log("Sending form", $scope.form);
                $http.post('/form', {
                    form: $scope.form
                })
                .success(function(data, status) {
                    $scope.confirmed = true;
                    $scope.confirmationMessage = $sce.trustAsHtml(data);
                    console.log(data);
                })
                .error(function(data, status) {
                    alert("Ups, ha habido un error. Respondenos al email de la invitación con los datos que has escrito en el formulario.");
                    console.log(data);
                });
            }
        }

    }


    $interval(function() {
        $scope.seconds2married = ($scope.weddingDate.getTime() - new Date().getTime()) / 1000;
        $scope.days2married = parseInt($scope.seconds2married / 24 / 3600);
        $scope.hours2married = parseInt(($scope.seconds2married - $scope.days2married * 24 * 3600) / 3600);
        $scope.minutes2married = parseInt(($scope.seconds2married - $scope.days2married * 24 * 3600 - $scope.hours2married * 3600) / 60);
        $scope.secs2married = parseInt(($scope.seconds2married - $scope.days2married * 24 * 3600 - $scope.hours2married * 3600 - $scope.minutes2married * 60));
    }, 1000);



}]);
