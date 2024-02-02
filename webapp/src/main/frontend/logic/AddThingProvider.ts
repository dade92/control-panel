import {staticRestClient} from "./RestClient";
import {ThingType} from "../Thing";

export type AddThingProvider = (thingType: ThingType, thingName: string) => Promise<void>;

//TODO understand what to do with the device id!
export const RestAddThingProvider: AddThingProvider = (thingType: ThingType, thingName: string) =>
    staticRestClient.post(`/v1/things/add/123`, {thingType, thingName})
