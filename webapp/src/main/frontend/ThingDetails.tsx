import {FC, useState} from "react";
import {Management, Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {ThingDetailText} from "./Texts";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {RemoveThingButton} from "./RemoveThingButton";

interface Props {
    thing: Thing;
    switchStatusProvider: SwitchStatusProvider;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
    onThingRemoved: (thing: Thing) => void;
    shouldBeLoading: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  height: 48px;
`

export const ThingDetails: FC<Props> = ({
                                            thing,
                                            onChangeStatus,
                                            switchStatusProvider,
                                            onThingRemoved,
                                            shouldBeLoading
                                        }) => {
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

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            <ThingDetailText data-testid={'type'}>{thing.type}</ThingDetailText>
            <ThingDetailText data-testid={'name'}>{thing.name}</ThingDetailText>
            <Switch checked={status.switch === ThingStatus.ON} disabled={disabled} onChange={changeStatus}/>
            <RemoveThingButton
                loading={shouldBeLoading}
                thing={thing}
                onRemoved={() => onRemoved(thing)}
            />
        </Wrapper>
    </>
}