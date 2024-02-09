import {createServer, Response, Server} from "miragejs";

const thingsResponse = {
    things: [
        {
            id: '12333',
            name: 'Luce soggiorno',
            device: "arduino uno",
            deviceId: "XYZ",
            type: "LAMP",
            management: {
                switch: "OFF"
            }
        },
        {
            id: '45666',
            name: 'Luce cucina',
            device: "arduino uno",
            deviceId: "XYZ",
            type: "LAMP",
            management: {
                switch: "OFF"
            }
        },
        {
            id: '67777',
            name: 'Luce camera',
            device: "arduino due",
            deviceId: "YYY",
            type: "LAMP",
            management: {
                switch: "OFF"
            }
        },
        {
            id: '456',
            name: 'Lavastoviglie',
            device: "arduino due",
            deviceId: "YYY",
            type: "APPLIANCE",
            management: {
                switch: "OFF"
            }
        },
        {
            id: '777',
            name: 'Allarme casa',
            device: "arduino tre",
            deviceId: "XXX",
            type: "ALARM",
            management: {
                switch: "OFF"
            }
        },
        {
            id: '888',
            name: 'Tapparella Soggiorno',
            device: "arduino quattro",
            deviceId: "YYY",
            type: "ROLLER_SHUTTER",
            management: {
                switch: "OFF"
            }
        }
    ]
};

const thingAddedResponse = {
    thing: {
        id: '999',
        name: 'Test name',
        device: "arduino uno",
        deviceId: "XYZ",
        type: "ROLLER_SHUTTER",
        management: {
            switch: "OFF"
        }
    }
}

const things200 = (): Response => new Response(200, {}, thingsResponse);
const things500 = (): Response => new Response(500);
const switchStatus200 = (): Response => new Response(204);
const removeThing200 = (): Response => new Response(204);
const addThing200 = (): Response => new Response(200, {}, thingAddedResponse);
const addThing500 = (): Response => new Response(500, {});
const switchStatus500 = (): Response => new Response(500);

export const server: () => Server = () =>
    createServer({
        logging: true,
        routes() {
            this.get('/api/v1/things', things200, {timing: 1000});
            this.post('/api/v1/switch/:deviceId/:thingId', switchStatus200, {timing: 1000});
            this.post('/api/v1/things/remove/:deviceId/:thingId', removeThing200, {timing: 1000});
            this.post('/api/v1/things/add', addThing200, {timing: 1000});
        },
    });