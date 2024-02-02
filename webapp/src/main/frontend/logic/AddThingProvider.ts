import {staticRestClient} from "./RestClient";
import {ThingType} from "../Thing";

export type AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) => Promise<void>;

export const RestAddThingProvider: AddThingProvider = (deviceId: string | null, thingType: ThingType, thingName: string) =>
    staticRestClient.post(`/v1/things/add`, {deviceId, thingType, thingName})
