import {Device, Thing} from "../Thing";

export const thingsToDeviceAdapter = (things: Thing[]): Device[] => {
    const devices: Device[] = [];
    things.forEach((t) => {
        if (!devices.find((d) => d.deviceId == t.deviceId)) {
            devices.push({deviceId: t.deviceId, deviceName: t.device});
        }
    });

    return devices;
}