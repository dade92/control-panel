import {Thing} from "./Thing";
import {staticRestClient} from "./logic/RestClient";

export interface ThingsRetrieveResponse {
    things: Thing[];
}

export type RetrieveThingsProvider = () => Promise<ThingsRetrieveResponse>;

export const RestRetrieveThingsProvider: RetrieveThingsProvider = () =>
    staticRestClient.get<ThingsRetrieveResponse>('/v1/things')