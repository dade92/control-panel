import {createServer, Response} from "miragejs";
import {waitFor} from "@testing-library/react";
import {RestAddThingProvider} from "./AddThingProvider";
import {ThingType} from "../Thing";

describe('AddThingProvider', () => {

    const addThing200 = (): Response => new Response(204);

    it('calls API correctly', async () => {
        createServer({
            routes() {
                this.post('/v1/things/add', addThing200);
            },
        });

        await waitFor(() => {
            expect(RestAddThingProvider('123', ThingType.LAMP, 'name'))
                .toStrictEqual(Promise.resolve())
        });
    })

})