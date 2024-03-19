import {staticRestClient} from "../RestClient";
import {Thing, ThingType} from "../Types";

export interface ThingAddedResponse {
    thing: Thing
}

export type AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) => Promise<ThingAddedResponse>;

export const RestAddThingProvider: AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) =>
    staticRestClient.post(`/v1/things/add`, {deviceId, type: thingType, name: thingName})
