export interface Thing {
    id: string,
    name: string,
    device: string,
    deviceId: string,
    type: ThingType,
    management: Management
}

export interface Device {
    deviceId: string;
    deviceName: string;
}

export enum ThingType {
    LAMP = "LAMP",
    ALARM = "ALARM"
}

export interface Management {
    switch: ThingStatus;
}

export enum ThingStatus {
    ON = "ON",
    OFF = "OFF"
}

