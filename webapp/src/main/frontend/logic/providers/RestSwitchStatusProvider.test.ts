import {RestSwitchStatusProvider} from "./SwitchStatusProvider";
import {Builder} from "builder-pattern";
import {Thing, ThingStatus} from "../Types";
import {staticRestClient} from "../RestClient";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

describe('RestSwitchStatusProvider', () => {


    it('changes successfully the status', async () => {
        mockedRestClient.post.mockReturnValue(Promise.resolve());

        const response = await RestSwitchStatusProvider(
            Builder<Thing>().deviceId('XYZ').id('123').build(),
            {switch: ThingStatus.ON}
        );

        expect(mockedRestClient.post).toHaveBeenCalledWith('/v1/switch/XYZ/123', {switch: ThingStatus.ON});
        expect(response).toBe(undefined);
    })
});