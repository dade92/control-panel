import {createServer, Server, Response} from "miragejs";

const thingsResponse = {
    things: [
        {
            id: 123,
            device: "arduino uno",
            deviceId: "XYZ",
            type: "LAMP",
            management: {
                switch: "OFF"
            }
        },
        {
            id: 456,
            device: "arduino uno",
            deviceId: "XYZ",
            type: "ALARM",
            management: {
                switch: "OFF"
            }
        }
    ]
};

const things200 = (): Response => new Response(200, {}, thingsResponse);
const things500 = (): Response => new Response(500);
const switchStatus200 = (): Response => new Response(204);
const switchStatus500 = (): Response => new Response(500);

export const server: () => Server = () =>
    createServer({
        logging: true,
        routes() {
            this.get('/api/v1/things', things200, {timing: 1000});
            this.post('/api/v1/switch/:deviceId/:thingId', switchStatus200, {timing: 1000});
        },
    });