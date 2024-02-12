import {staticRestClient} from "./RestClient";

export type ChangeHostProvider = (deviceId: string, deviceHost: string) => Promise<void>;

export const RestChangeHostProvider: ChangeHostProvider = (deviceId: string, deviceHost: string) => {
    return staticRestClient.put(`/v1/things/changeHost/${deviceId}`, {newHost: deviceHost})
}