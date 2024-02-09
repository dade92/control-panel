import {FC, useState} from "react";
import {ThingDetails} from "./ThingDetails";
import {Thing, ThingType} from "./Thing";
import styled from "styled-components";
import {Divider, List} from "@mui/material";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {AddThingButton} from "./AddThingButton";
import {RemoveThingConfirmModal} from "./RemoveThingConfirmModal";
import {Subtitle} from "./Subtitle";
import {AddThingModal} from "./AddThingModal";
import {AddThingProvider, ThingAddedResponse} from "./logic/AddThingProvider";
import {thingsToDeviceAdapter} from "./logic/ThingsToDeviceAdapter";
import {ThingPanelText} from "./Texts";

const ThingsPanelWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 70%;
  @media screen and (max-width: 600px) {
    width: 85%;
  }
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.11);
  padding: 16px;
`

interface Props {
    things: Thing[];
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
    switchStatusProvider: SwitchStatusProvider;
    onThingRemoved: (thing: Thing) => void;
    idWaitingToBeRemoved: string | null;
    addThingProvider: AddThingProvider;
    onThingAdded: (thing: Thing | null) => void;
}

export const ThingsPanel: FC<Props> = ({
                                           things,
                                           onChangeStatus,
                                           switchStatusProvider,
                                           onThingRemoved,
                                           idWaitingToBeRemoved,
                                           addThingProvider,
                                           onThingAdded
                                       }) => {
    const [removedThing, setRemovedThing] = useState<Thing | null>(null);
    const [addThing, setAddThing] = useState<boolean>(false);

    const onRemove = (thing: Thing) => {
        setRemovedThing(thing);
    }

    const onModalClosed = () => {
        setRemovedThing(null);
    }

    const onRemoveConfirmed = () => {
        onThingRemoved(removedThing!);
        setRemovedThing(null);
    }

    const onAddThing = (deviceId: string | null, thingType: ThingType, thingName: string) => {
        addThingProvider(deviceId, thingType, thingName)
            .then((t: ThingAddedResponse) => {
                onThingAdded(t.thing);
            })
            .catch(() => {
                onThingAdded(null);
            }).finally(() => {
            setAddThing(false);
        });
    }

    return (
        <ThingsPanelWrapper data-testid={'things-panel-wrapper'}>
            <Subtitle subtitle={'Control Panel'}/>
            <ListWrapper>
                <List
                    sx={{
                        width: '100%',
                        overflow: 'auto',
                        maxHeight: 350,
                    }}
                >
                    {things.map((thing) => {
                        return <>
                            <ThingDetails
                                key={thing.id}
                                data-testid={`details-${thing.id}`}
                                thing={thing}
                                onChangeStatus={onChangeStatus}
                                switchStatusProvider={switchStatusProvider}
                                onThingRemoved={onRemove}
                                shouldBeLoading={idWaitingToBeRemoved == thing.id}
                            />
                            <Divider/>
                        </>
                    })}
                </List>
                {things.length == 0 &&
                    <ThingPanelText>No things at the moment, click on the add button to add a new
                        Thing</ThingPanelText>}
                <AddThingButton onAddThingClicked={() => setAddThing(true)}/>
            </ListWrapper>
            {removedThing != null &&
                <RemoveThingConfirmModal thing={removedThing} onConfirm={onRemoveConfirmed} onCancel={onModalClosed}/>}
            {
                addThing && <AddThingModal devices={thingsToDeviceAdapter(things)}
                                           handleClose={() => setAddThing(false)}
                                           onAddThing={(deviceId: string | null, thingType: ThingType, thingName: string) => {
                                               onAddThing(deviceId, thingType, thingName);
                                           }}/>
            }
        </ThingsPanelWrapper>
    );
}