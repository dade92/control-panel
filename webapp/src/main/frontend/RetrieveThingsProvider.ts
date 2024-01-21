import {Thing} from "./Thing";
import {staticRestClient} from "./logic/RestClient";

export type RetrieveThingsProvider = () => Promise<ApiResponse>;

export const RestRetrieveThingsProvider: RetrieveThingsProvider = () =>
    staticRestClient.get<ApiResponse>('/v1/things')

export interface ApiResponse {
    things: Thing[];
}
