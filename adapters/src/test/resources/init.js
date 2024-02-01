db = new Mongo().getDB("control-panel-db");

db.createCollection('device', {capped: false});

db.device.insert([
    {
        "_id": '0da34700-1ed4-4ee5-8bac-4c2ab5ddeadb',
        "deviceName": "arduino-uno",
        "host": "http://esp32s3-654e44:8080",
        "things": [{
            _id: '8a1ea8db-fffa-4c6f-935e-39a34eba871c',
            name: 'kitchen lamp',
            type: 'LAMP',
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
        "_id": '10152e1b-d6d4-4536-8679-52a0446dc753',
        "deviceName": "arduino-uno-mega",
        "host": "http://esp32s3-654e44:8080",
        "things": [{
            _id: '392325c0-f023-4a87-95d2-2ca041bb5627',
            name: 'kitchen lamp',
            type: 'ALARM',
            management: {switch: 'OFF'},
            idOnDevice: 1
        }],
        "creationDate": '2023-12-29T08:48:06.742Z'
    },
]);