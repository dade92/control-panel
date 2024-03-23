import {useEffect, useState} from "react";
import {Thing, ThingStatus} from "../Types";
import {SwitchStatusProvider} from "../providers/SwitchStatusProvider";
import {useSubscription} from "react-stomp-hooks";

interface ThingDetailsStore {
    state: {
        status: ThingStatus;
        disabled: boolean;
    };
    actions: {
        changeStatus: () => void;
        onRemoved: (thing: Thing) => void;
        onInfoClicked: (thing: Thing) => void;
    }
}

export interface ChangeStatusMessage {
    deviceId: string;
    thingId: string;
    status: ThingStatus;
}

export const useThingDetailsStore = (
    thing: Thing,
    switchStatusProvider: SwitchStatusProvider,
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void,
    onThingRemoved: (thing: Thing) => void,
    onThingInfoClicked: (thing: Thing) => void,
    forceOff: boolean
): ThingDetailsStore => {
    const [status, setStatus] = useState<ThingStatus>(thing.management.switch);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (forceOff) {
            setStatus(ThingStatus.OFF);
        }
    }, [forceOff]);

    const onChangeStatusMessageReceived = (message: ChangeStatusMessage) => {
        console.log('Received ws message with fields: ');

        if (message.thingId === thing.id) {
            console.log('Changing status of thing: ', message.thingId, ' to: ', message.status);
            setStatus(message.status);
            updateInnerStatus(message.status);
        }
    }

    useSubscription(
        "/change-status",
        (message) => onChangeStatusMessageReceived(JSON.parse(message.body) as ChangeStatusMessage)
    )

    const updateInnerStatus = (newStatus: ThingStatus) => {
        thing.management.switch = newStatus;
        onChangeStatus(true, thing);
    };

    const changeStatus = () => {
        let newStatus = ThingStatus.OFF;
        const oldStatus = status;

        if (status == "ON") {
            newStatus = ThingStatus.OFF;
        } else {
            newStatus = ThingStatus.ON;
        }
        setStatus(newStatus);
        setDisabled(true);

        switchStatusProvider(thing, {switch: newStatus})
            .then(() => {
                updateInnerStatus(newStatus);
            })
            .catch(() => {
                onChangeStatus(false, thing);
                setStatus(oldStatus);
            }).finally(() => {
            setDisabled(false);
        });
    }

    const onRemoved = (thing: Thing) => {
        onThingRemoved(thing);
    }

    const onInfoClicked = (thing: Thing) => {
        onThingInfoClicked(thing)
    }

    return {
        state: {
            status: status,
            disabled,
        },
        actions: {
            changeStatus,
            onRemoved,
            onInfoClicked
        }
    }
}