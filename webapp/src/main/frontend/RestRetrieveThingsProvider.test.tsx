import {RestRetrieveThingsProvider} from "./RetrieveThingsProvider";
import {createServer, Response} from "miragejs";
import {Thing} from "./Thing";
import {waitFor} from "@testing-library/react";

describe('RestRetrieveThingsProvider', () => {
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

    const thingsSuccessfulResponse = (): Response => new Response(200, {}, thingsResponse);
    const thingsErrorResponse = (): Response => new Response(500);

    it('returns things if server answers correctly', async () => {
        createServer({
            routes() {
                this.get('/v1/things', thingsSuccessfulResponse);
            },
        })

        let actualResponse: Thing[];

        RestRetrieveThingsProvider()
            .then((response) => {
                actualResponse = response.things
            });

        await waitFor(() => {
            expect(actualResponse).toStrictEqual([{
                id: 123,
                device: "arduino uno",
                deviceId: "XYZ",
                type: "LAMP",
                management: {
                    switch: "OFF"
                }
            }, {
                id: 456,
                device: "arduino uno",
                deviceId: "XYZ",
                type: "ALARM",
                management: {
                    switch: "OFF"
                }
            }
            ])
        })
    })

    it('returns an error if server returns 500', async () => {
        createServer({
            routes() {
                this.get('/v1/things', thingsErrorResponse);
            },
        })

        RestRetrieveThingsProvider()
            .then((response) => {
                expect(response.things).toBe([{
                    id: 123,
                    device: "arduino uno",
                    deviceId: "XYZ",
                    type: "LAMP",
                    management: {
                        switch: "OFF"
                    }
                }, {
                    id: 456,
                    device: "arduino uno",
                    deviceId: "XYZ",
                    type: "ALARM",
                    management: {
                        switch: "OFF"
                    }
                }
                ])

            });
    })
});