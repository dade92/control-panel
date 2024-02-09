import {useState} from "react";
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
    }
}

export const useThingDetailsStore = (
    thing: Thing,
    switchStatusProvider: SwitchStatusProvider,
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void,
    onThingRemoved: (thing: Thing) => void
): ThingDetailsStore => {
    const [status, setStatus] = useState<Management>(thing.management);
    const [disabled, setDisabled] = useState<boolean>(false);

    const changeStatus = () => {
        let newStatus = ThingStatus.OFF;
        let oldStatus = status.switch;

        if (status.switch == "ON") {
            newStatus = ThingStatus.OFF;
        } else {
            newStatus = ThingStatus.ON;
        }
        setStatus({switch: newStatus});
        setDisabled(true);

        switchStatusProvider(thing, {switch: newStatus})
            .then(() => {
                thing.management.switch = newStatus;
                onChangeStatus(true, thing);
            })
            .catch(() => {
                onChangeStatus(false, thing);
                setStatus({switch: oldStatus});
            }).finally(() => {
            setDisabled(false);
        });
    }

    const onRemoved = (thing: Thing) => {
        onThingRemoved(thing);
    }

    return {
        state: {
            status: status.switch,
            disabled,
        },
        actions: {
            changeStatus,
            onRemoved
        }
    }
}