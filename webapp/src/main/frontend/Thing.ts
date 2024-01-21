export interface Thing {
    id: string,
    device: string,
    deviceId: string,
    type: ThingType,
    status: ThingStatus
}

export enum ThingType {
    LAMP = "LAMP",
    ALARM = "ALARM"
}
//TODO express this better
export interface ThingStatus {
    switch: string;
}