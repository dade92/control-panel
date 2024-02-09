import {FC, ReactElement, useState} from "react";
import {Management, Thing, ThingStatus, ThingType} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {ThingDetailText} from "./Texts";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {RemoveThingButton} from "./RemoveThingButton";
import LightIcon from '@mui/icons-material/Light';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';

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

    const renderIcon = (thingType: ThingType): ReactElement => {
        switch (thingType) {
            case ThingType.ALARM:
                return <CameraIndoorIcon data-testid={'alarm-icon'}/>;
            case ThingType.LAMP:
                return <LightIcon data-testid={'light-icon'}/>;
            case ThingType.APPLIANCE:
                return <LocalLaundryServiceIcon data-testid={'appliance-icon'}/>;
            //TODO
            case ThingType.ROLLER_SHUTTER:
                return <KitchenIcon data-testid={'roller-shutter-icon'}/>;
        }
    }

    const isOn = (status: ThingStatus) => status === ThingStatus.ON

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            {renderIcon(thing.type)}
            <ThingDetailText data-testid={'name'}>{thing.name}</ThingDetailText>
            <Switch checked={isOn(status.switch)} disabled={disabled} onChange={changeStatus}/>
            <RemoveThingButton
                loading={shouldBeLoading}
                thing={thing}
                onRemoved={() => onRemoved(thing)}
            />
        </Wrapper>
    </>
}