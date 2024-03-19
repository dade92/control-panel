import {staticRestClient} from "../RestClient";

export type RemoveThingsProvider = (deviceId: string, thingId: string) => Promise<void>;

export const RestRemoveThingsProvider: RemoveThingsProvider = (deviceId: string, thingId: string) =>
    staticRestClient.post(`/v1/things/remove/${deviceId}/${thingId}`, {})