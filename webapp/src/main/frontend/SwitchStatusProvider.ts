import {staticRestClient} from "./logic/RestClient";
import {Thing, ThingStatus} from "./Thing";

export type SwitchStatusProvider = (thing: Thing, newStatus: ThingStatus) => Promise<void>;

export const RestSwitchStatusProvider: SwitchStatusProvider = (thing: Thing, newStatus: ThingStatus) =>
    staticRestClient.post(`/v1/switch/${thing.deviceId}/${thing.id}`, newStatus)