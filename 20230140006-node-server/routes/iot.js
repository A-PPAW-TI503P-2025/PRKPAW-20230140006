const express = require('express');
const router = express.Router();
const iotController = require('../controllers/iotController');

router.post('/ping', iotController.testConnection);
module.exports = router;
router.post('/data', iotController.receiveSensorData);
// Endpoint penerima data sensor
// URL: http://localhost:3001/api/iot/data
router.post('/data', iotController.receiveSensorData);
    
module.exports = router;
