import {FC, ReactElement} from "react";
import {Thing, ThingStatus, ThingType} from "../../logic/Types";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {ThingDetailText} from "../atoms/Texts";
import {SwitchStatusProvider} from "../../logic/providers/SwitchStatusProvider";
import {RemoveThingButton} from "../atoms/RemoveThingButton";
import LightIcon from '@mui/icons-material/Light';
import RollerShadesIcon from '@mui/icons-material/RollerShades';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import {useThingDetailsStore} from "../../logic/stores/ThingDetailsStore";
import {ThingInfoButton} from "../atoms/ThingInfoButton";

interface Props {
    thing: Thing;
    switchStatusProvider: SwitchStatusProvider;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
    onThingRemoved: (thing: Thing) => void;
    shouldBeLoading: boolean;
    onInfoClicked: (thing: Thing) => void;
    forceOff: boolean;
}

const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 4px;
  align-items: center;
  padding: 8px;
  height: 48px;
`

export const ThingDetails: FC<Props> = ({
                                            thing,
                                            onChangeStatus,
                                            switchStatusProvider,
                                            onThingRemoved,
                                            shouldBeLoading,
                                            onInfoClicked,
                                            forceOff
                                        }) => {
    const store = useThingDetailsStore(
        thing,
        switchStatusProvider,
        onChangeStatus,
        onThingRemoved,
        onInfoClicked,
        forceOff
    );

    const renderIcon = (thingType: ThingType): ReactElement => {
        switch (thingType) {
            case ThingType.ALARM:
                return <CameraIndoorIcon data-testid={'alarm-icon'}/>;
            case ThingType.LAMP:
                return <LightIcon data-testid={'light-icon'}/>;
            case ThingType.APPLIANCE:
                return <LocalLaundryServiceIcon data-testid={'appliance-icon'}/>;
            case ThingType.ROLLER_SHUTTER:
                return <RollerShadesIcon data-testid={'roller-shutter-icon'}/>;
        }
    }

    const isOn = (status: ThingStatus) => status == ThingStatus.ON;

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            {renderIcon(thing.type)}
            <ThingDetailText data-testid={'name'}>{thing.name}</ThingDetailText>
            <Switch checked={isOn(store.state.status)} disabled={store.state.disabled}
                    onChange={store.actions.changeStatus}/>
            <ActionsWrapper>
                <ThingInfoButton thing={thing} onClick={() => store.actions.onInfoClicked(thing)}/>
                <RemoveThingButton
                    loading={shouldBeLoading}
                    thing={thing}
                    onRemoved={() => store.actions.onRemoved(thing)}
                />
            </ActionsWrapper>
        </Wrapper>
    </>
}