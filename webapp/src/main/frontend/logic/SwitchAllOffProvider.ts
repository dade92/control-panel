import {staticRestClient} from "./RestClient";
import {Thing} from "../Thing";

export type SwitchAllOffProvider = (things: Thing[]) => Promise<void>;

export const RestSwitchAllOffProvider: SwitchAllOffProvider = (things) => {
    return staticRestClient.post(`/v1/things/switchOff`, {things: things})
}