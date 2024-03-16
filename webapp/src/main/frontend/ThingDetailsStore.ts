import {useEffect, useState} from "react";
import {Management, Thing, ThingStatus} from "./Thing";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";

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
        if(forceOff) {
            setStatus(ThingStatus.OFF);
        }
    }, [forceOff]);

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
                thing.management.switch = newStatus;
                onChangeStatus(true, thing);
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