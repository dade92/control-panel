import {staticRestClient} from "../RestClient";
import {Thing} from "../Thing";

export type SwitchAllOffProvider = (things: Thing[]) => Promise<void>;

export const RestSwitchAllOffProvider: SwitchAllOffProvider = (things) =>
    staticRestClient.post(`/v1/switch/switchAll`, {things: things})