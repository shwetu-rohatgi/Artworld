(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
      
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        

        service.registerDevice = registerDevice;
        service.isRegisteredDevice = isRegisteredDevice;
        service.GetDeviceRegistrationData = GetDeviceRegistrationData;
        service.UpdateRegisterDevice = UpdateRegisterDevice;
        service.GetDevices = GetDevices;
        service.GetInstruments = GetInstruments;
        service.getInstrumentDataByStream = getInstrumentDataByStream;
        service.GetInstrumentDataById = GetInstrumentDataById;
        service.UpdateInstrument = UpdateInstrument;
        

        service.CheckDeviceId = CheckDeviceId;
        

        service.GetStreamData = GetStreamData;


        return service;


        // User Collection functions 
        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/users', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/users/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }



        // Device Registration Functions
        function GetDevices(_id) {
            console.log('/api/users/devices/' +  _id);
            return $http.get('/api/users/devices/' +  _id).then(handleSuccess, handleError);

        }

        function GetInstruments(serial) {
             return $http.get('/api/users/instruments/' + serial).then(handleSuccess, handleError);
        }

        function getInstrumentDataByStream(streamId) {
            return $http.get('/api/users/getInstrumentDataByStream/' +  streamId).then(handleSuccess, handleError);
        }

        function CheckDeviceId(deviceId){
            console.log("hello");
            return $http.get('/api/users/checkDeviceId/' + deviceId).then(handleSuccess, handleError);
        }


        function GetDeviceRegistrationData(serial) {
            return $http.get('/api/users/getDeviceRegistrationData/' +  serial).then(handleSuccess, handleError);
        }

        function UpdateRegisterDevice(device) {
            return $http.put('/api/users/updateRegisterDevice/' + device.deviceSerialNo, device).then(handleSuccess, handleError);
        }

        function registerDevice(device) {
            return $http.post('/api/users/registerDevice', device).then(handleSuccess, handleError);
        }

        function isRegisteredDevice(serial) {
           return $http.get('/api/users/isRegisteredDevice/' +  serial).then(handleSuccess, handleError);
        }


        // Stream functions 
        function GetStreamData(streamId){
            return $http.get('/api/users/stream/' + streamId).then(handleSuccess, handleError);
        }

        // Instrument Functions 
        function GetInstrumentDataById(Id){
            return $http.get('/api/users/getInstrumentDataById/' + Id).then(handleSuccess, handleError);
        }

      function UpdateInstrument(instrument) {
            return $http.put('/api/users/updateInstrument/'+ instrument._id , instrument).then(handleSuccess, handleError);
        }

        // Response functions 
        function handleSuccess(res) {
            console.log(res);
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    
    }

})();
