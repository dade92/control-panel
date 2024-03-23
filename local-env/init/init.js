db = new Mongo().getDB("control-panel-db");

db.createCollection('device', {capped: false});

db.device.insert([
    {
        "_id": 'c9e4c231-dbca-428f-9442-b01440f91330',
        "deviceName": "arduino-uno",
        "host": "http://esp32s3-654e44:8080",
        "things": [{
            _id: '8a1ea8db-fffa-4c6f-935e-39a34eba871c',
            name: 'kitchen lamp',
            type: 'ROLLER_SHUTTER',
            management: {switch: 'OFF'},
            idOnDevice: 1
        }, {
            _id: '19851c6d-89ad-48c9-9b0c-9abb9eb92eea',
            name: 'dining room lamp',
            type: 'LAMP',
            management: {switch: 'ON'},
            idOnDevice: 2
        }],
        "creationDate": '2023-12-29T08:48:06.742Z'
    },
    {
        "_id": 'a9cc44cf-4fa0-4804-ba0c-f25ec6a63c12',
        "deviceName": "arduino-uno-mega",
        "host": "http://esp32s3-654e44:8080",
        "things": [{
            _id: '392325c0-f023-4a87-95d2-2ca041bb5627', name: 'kitchen lamp',
            type: 'LAMP',
            management: {switch: 'OFF'},
            idOnDevice: 1
        }],
        "creationDate": '2023-12-29T08:48:06.742Z'
    },
]);