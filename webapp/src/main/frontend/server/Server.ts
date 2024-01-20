import {createServer, Server, Response} from "miragejs";

const thingsResponse = {
    things: [
        {
            id: 123,
            device: "arduino uno",
            deviceId: "XYZ",
            type: "LAMP",
            status: {
                switch: "OFF"
            }
        },
        {
            id: 456,
            device: "arduino uno",
            deviceId: "XYZ",
            type: "ALARM",
            status: {
                switch: "OFF"
            }
        }
    ]
};

const things200 = (): Response => new Response(200, {}, thingsResponse);

export const server: () => Server = () =>
    createServer({
        logging: true,
        routes() {
            this.get('/api/v1/things', things200, {timing: 1000});
        },
    });