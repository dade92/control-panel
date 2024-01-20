export interface Thing {
    id: number,
    device: string,
    deviceId: string,
    type: ThingType,
    status: ThingStatus
}

export enum ThingType {
    LAMP = "LAMP",
    ALARM = "ALARM"
}

export interface ThingStatus {
    switch: string;
}