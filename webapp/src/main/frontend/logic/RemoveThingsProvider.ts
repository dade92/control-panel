import {staticRestClient} from "./RestClient";

export type RemoveThingsProvider = (thingId: string) => Promise<void>;

//TODO we should pass the deviceId too, otherwise this should iterate over all devices (not good)
export const RestRemoveThingsProvider: RemoveThingsProvider = (thingId: string) =>
    staticRestClient.post(`/v1/things/remove/${thingId}`, {})