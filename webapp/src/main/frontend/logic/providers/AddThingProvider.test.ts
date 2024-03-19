import {RestAddThingProvider} from "./AddThingProvider";
import {ThingType} from "../Types";
import {staticRestClient} from "../RestClient";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

describe('AddThingProvider', () => {


    it('calls rest client correctly', async () => {
        mockedRestClient.post.mockReturnValue(Promise.resolve());

        let deviceId = '123';
        let thingType = ThingType.LAMP;
        let thingName = 'name';

        const response = await RestAddThingProvider(deviceId, thingType, thingName);

        expect(mockedRestClient.post).toHaveBeenCalledWith('/v1/things/add', {
            deviceId,
            type: thingType,
            name: thingName
        });
        expect(response).toBe(undefined);
    })

})