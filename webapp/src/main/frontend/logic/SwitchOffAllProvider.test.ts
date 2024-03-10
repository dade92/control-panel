import {createServer, Response} from "miragejs";
import {waitFor} from "@testing-library/react";
import {RestAddThingProvider} from "./AddThingProvider";
import {ThingType} from "../Thing";
import {RestSwitchAllOffProvider} from "./SwitchAllOffProvider";

describe('RestSwitchAllOffProvider', () => {

    const switchAllOff = (): Response => new Response(204);

    it('calls API correctly', async () => {
        createServer({
            routes() {
                this.post('/v1/switch/switchAll', switchAllOff);
            },
        });

        await waitFor(() => {
            expect(RestSwitchAllOffProvider([]))
                .toStrictEqual(Promise.resolve())
        });
    })

})