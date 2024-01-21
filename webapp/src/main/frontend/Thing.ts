export interface Thing {
    id: string,
    deviceName: string,
    deviceId: string,
    type: ThingType,
    management: Management
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

