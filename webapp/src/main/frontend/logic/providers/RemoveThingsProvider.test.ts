import {RestRemoveThingsProvider} from "./RemoveThingsProvider";
import {waitFor} from "@testing-library/react";
import {staticRestClient} from "../RestClient";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

describe('RemoveThingsProvider', () => {

    it('calls restClient correctly', async () => {
        mockedRestClient.post.mockReturnValue(Promise.resolve());

        const deviceId = '123';
        const thingId = '456';

        const response = await RestRemoveThingsProvider(deviceId, thingId);

        expect(mockedRestClient.post).toHaveBeenCalledWith('/v1/things/remove/123/456', {});
        expect(response).toBe(undefined);
    })

})