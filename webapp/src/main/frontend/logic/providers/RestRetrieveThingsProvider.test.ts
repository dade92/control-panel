import {RestRetrieveThingsProvider} from "./RetrieveThingsProvider";
import {createServer, Response} from "miragejs";
import {Thing} from "../Types";
import {waitFor} from "@testing-library/react";
import {staticRestClient} from "../RestClient";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

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


    it('returns things if server answers correctly', async () => {
        mockedRestClient.get.mockReturnValue(Promise.resolve(thingsResponse));

        const response = await RestRetrieveThingsProvider();

        expect(response).toEqual(thingsResponse);
        expect(mockedRestClient.get).toHaveBeenCalledWith('/v1/things');
    })

    //TODO test the server error path!
});