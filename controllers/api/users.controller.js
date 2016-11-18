var config = require('config.json');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// User Routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);

// Stream Routes 
router.get('/stream/:_id', getStreamData);

// Registered Device Routes 
router.get('/devices/:_id', getDevices);
router.get('/isRegisteredDevice/:serial', isRegisteredDevice);
router.get('/checkDeviceId/:deviceId', checkDeviceId);
router.get('/getDeviceRegistrationData/:serial', GetDeviceRegistrationData);
router.put('/updateRegisterDevice/:serial', UpdateRegisterDevice);
router.post('/registerDevice', registerDevice);

// Instrument 
router.get('/instruments/:_id', getInstruments);
router.get('/getInstrumentDataById/:Id', GetInstrumentDataById);
router.put('/updateInstrument/:Id', UpdateInstrument);



module.exports = router;

function authenticateUser(req, res) {
   
    userService.authenticate(req.body.username, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateUser(req, res) {

    var userId = req.user.sub;

    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getInstruments(req, res) {
    console.log(" at api controlleer");
    userService.getInstruments(req.params._id)
        .then(function (instruments) {
             if (instruments) {
                res.send(instruments);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function GetInstrumentDataById(req, res) {
  
    userService.GetInstrumentDataById(req.params._id)
        .then(function (instrument) {
             if (instrument) {
                res.send(instrument);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getDevices(req, res) {
    userService.getDevices(req.params._id)
        .then(function (devices) {
             if (devices) {
                res.send(devices);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function getInstrumentDataByStream(req, res) {
    userService.getInstrumentDataByStream(req.params.streamId)
        .then(function (instrument) {
             if (instrument) {
                res.send(instrument);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function GetDeviceRegistrationData(req, res) {

    console.log("get device ");

    userService.GetDeviceRegistrationData(req.params.serial)
        .then(function (device) {
             if (device) {
                res.send(device);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getStreamData(req, res) {
    userService.getStreamData(req.params._id)
        .then(function (stream) {
             if (stream) {
                res.send(stream);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function isRegisteredDevice(req,res){
    userService.isRegisteredDevice(req.params.serial)
        .then(function (userId) {
                res.send(userId);
           
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function registerDevice(req, res) {
    userService.registerDevice(req.body)
    .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function UpdateRegisterDevice(req, res) {
    console.log("ddsd");
    userService.UpdateRegisterDevice(req.params.serial, req.body)
    .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function UpdateInstrument(req, res) {

    console.log("at ap controlleer dinstr update");

    userService.UpdateInstrument(req.params.Id, req.body)
    .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function checkDeviceId(req, res) {
console.log(req.params.deviceId);
    userService.checkDeviceId(req.params.deviceId)

    .then(function (result) {
         if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}