﻿(function () {
    'use strict';

    angular
        .module('app')
        .factory('FlashService', Service);

    function Service($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;
        service.LoaderStatus = LoaderStatus;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function LoaderStatus(status, keepAfterLocationChange) {

            var result = 'hide';

            if(status)
                result = 'show';

           
            $rootScope.flash = {
                type: 'loader', 
                result: result,
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'alert', 
                result:'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'alert',
                result:'danger',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();