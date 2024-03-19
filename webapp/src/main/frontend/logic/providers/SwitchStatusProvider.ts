import {staticRestClient} from "../RestClient";
import {Thing, Management} from "../Types";

export type SwitchStatusProvider = (thing: Thing, newStatus: Management) => Promise<void>;

export const RestSwitchStatusProvider: SwitchStatusProvider = (thing: Thing, newStatus: Management) =>
    staticRestClient.post(`/v1/switch/${thing.deviceId}/${thing.id}`, newStatus)