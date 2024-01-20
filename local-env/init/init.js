db = new Mongo().getDB("control-panel-db");

db.createCollection('device', {capped: false});

db.device.insert([
    {
        "_id": '1',
        "name": "arduino-uno",
        "things": {things: []},
        "creationDate": '2023-12-29T08:48:06.742Z'
    },
    {
        "_id": '2',
        "name": "arduino-uno",
        "things": {things: []},
        "creationDate": '2023-12-29T08:48:06.742Z'
    },
]);