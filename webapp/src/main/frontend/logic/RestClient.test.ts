import {RestClient, staticRestClient} from "./RestClient";
import {createServer, Response} from "miragejs";

describe('RestClient', () => {

    interface Something {
        response: string;
    }

    const bodyResponse = {response: 'body with some data'};
    const aResponse = (): Response => new Response(200, {}, bodyResponse);
    const getUrl = '/v1/things';
    const postUrl = '/v1/things/add';
    const headers = {'Content-Type': 'application/json'};

    it('should GET', async () => {
        createServer({
            routes() {
                this.get('/v1/things', aResponse);
            },
        });

        const data = await staticRestClient.get<Something>(getUrl, headers);
        expect(data).toEqual(bodyResponse);

    })

    it('should POST', async () => {
        createServer({
            routes() {
                this.post('/v1/things/add', aResponse);
            },
        });

        const data = await staticRestClient.post(postUrl, bodyResponse, headers)
        expect(data).toEqual(bodyResponse);
    });

    it('should PUT', async () => {
        createServer({
            routes() {
                this.put('/v1/things/add', aResponse);
            },
        });

        const data = await staticRestClient.put(postUrl, bodyResponse, headers)
        expect(data).toEqual(bodyResponse);
    });

})