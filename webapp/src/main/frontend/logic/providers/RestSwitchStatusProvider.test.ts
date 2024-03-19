import {RestSwitchStatusProvider} from "./SwitchStatusProvider";
import {Builder} from "builder-pattern";
import {Thing, ThingStatus} from "../Types";
import {createServer, Response} from "miragejs";
import {waitFor} from "@testing-library/react";

describe('RestSwitchStatusProvider', () => {

    const switchStatus200 = (): Response => new Response(204);

    it('changes successfully the status', async () => {
        createServer({
            routes() {
                this.post('/v1/switch/XYZ/123', switchStatus200);
            },
        });


        await waitFor(() => {
            expect(RestSwitchStatusProvider(
                Builder<Thing>().deviceId('XYZ').id('123').build(),
                {switch: ThingStatus.ON}
            )).toStrictEqual(Promise.resolve())
        });
    })
});