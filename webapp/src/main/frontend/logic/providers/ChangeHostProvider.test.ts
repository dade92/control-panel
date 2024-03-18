import {RestChangeHostProvider} from "./ChangeHostProvider";
import {staticRestClient} from "../RestClient";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

describe('ChangeHostProvider', () => {

    it('should call the rest client properly', async () => {
        mockedRestClient.put.mockReturnValue(Promise.resolve());

        const response = await RestChangeHostProvider('123', 'new host');

        expect(mockedRestClient.put).toHaveBeenCalledWith('/v1/things/changeHost/123', {newHost: 'new host'});
        expect(response).toBe(undefined);
    })

})