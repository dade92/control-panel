import {Thing} from "../Types";
import {RestSwitchAllOffProvider} from "./SwitchAllOffProvider";
import {staticRestClient} from "../RestClient";
import {Builder} from "builder-pattern";

jest.mock('../RestClient');
const mockedRestClient = jest.mocked(staticRestClient);

describe('RestSwitchAllOffProvider', () => {
    it('should call the rest client properly', async () => {
        mockedRestClient.post.mockReturnValue(Promise.resolve());

        const things = [Builder<Thing>().id('123').build()];

        await RestSwitchAllOffProvider(things);

        expect(mockedRestClient.post).toHaveBeenCalledWith('/v1/switch/switchAll', {things: things});
    });

})