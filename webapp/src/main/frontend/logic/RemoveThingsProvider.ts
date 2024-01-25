import {staticRestClient} from "./RestClient";

export type RemoveThingsProvider = (thingId: string) => Promise<void>;

export const RestRemoveThingsProvider: RemoveThingsProvider = (thingId: string) =>
    staticRestClient.post(`/v1/things/remove/${thingId}`, {})