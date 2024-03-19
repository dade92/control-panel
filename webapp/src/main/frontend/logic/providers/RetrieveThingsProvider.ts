import {Thing} from "../Types";
import {staticRestClient} from "../RestClient";

export interface ThingsRetrieveResponse {
    things: Thing[];
}

export type RetrieveThingsProvider = () => Promise<ThingsRetrieveResponse>;

export const RestRetrieveThingsProvider: RetrieveThingsProvider = () =>
    staticRestClient.get<ThingsRetrieveResponse>('/v1/things')