import {createServer, Response} from "miragejs";
import {RestRemoveThingsProvider} from "./RemoveThingsProvider";
import {waitFor} from "@testing-library/react";

describe('RemoveThingsProvider', () => {
    const removeThing200 = (): Response => new Response(204);

    it('calls API correctly', async () => {

        createServer({
            routes() {
                this.post('/v1/things/remove/123/456', removeThing200);
            },
        });

        await waitFor(() => {
            expect(RestRemoveThingsProvider('123', '456'))
                .toStrictEqual(Promise.resolve())
        });
    })

})