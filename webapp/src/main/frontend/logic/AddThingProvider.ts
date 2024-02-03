import {staticRestClient} from "./RestClient";
import {Thing, ThingType} from "../Thing";

export interface ThingAddedResponse {
    thing: Thing
}

export type AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) => Promise<ThingAddedResponse>;

export const RestAddThingProvider: AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) =>
    staticRestClient.post(`/v1/things/add`, {deviceId, thingType, thingName})
