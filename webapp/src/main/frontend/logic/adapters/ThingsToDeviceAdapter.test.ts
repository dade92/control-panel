import {thingsToDeviceAdapter} from "./ThingsToDeviceAdapter";
import {Builder} from "builder-pattern";
import {Thing} from "../Thing";

describe('ThingsToDeviceAdapter', () => {

    it('should adapt multiple things to devices', () => {
        const result = thingsToDeviceAdapter([
            Builder<Thing>().device('device 1').deviceId('123').build(),
            Builder<Thing>().device('device 2').deviceId('456').build(),
            Builder<Thing>().device('device 2').deviceId('456').build(),
        ]);

        expect(result).toEqual([
            {
                deviceName: 'device 1',
                deviceId: '123'
            },
            {
                deviceName: 'device 2',
                deviceId: '456'
            }
        ])
    });

})