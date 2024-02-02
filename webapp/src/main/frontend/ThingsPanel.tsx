import {FC, useState} from "react";
import {ThingDetails} from "./ThingDetails";
import {Thing, ThingType} from "./Thing";
import styled from "styled-components";
import {Divider, List} from "@mui/material";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {AddThingButton} from "./AddThingButton";
import {ConfirmModal} from "./ConfirmModal";
import {Subtitle} from "./Subtitle";
import {AddThingModal} from "./AddThingModal";
import {AddThingProvider} from "./logic/AddThingProvider";
import {thingsToDeviceAdapter} from "./logic/ThingsToDeviceAdapter";

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
}

export const ThingsPanel: FC<Props> = ({
                                           things,
                                           onChangeStatus,
                                           switchStatusProvider,
                                           onThingRemoved,
                                           idWaitingToBeRemoved,
                                           addThingProvider
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
            .then(() => {

                setAddThing(false);
            })
            .catch(() => {
                console.log('Error while adding the new thing')
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
                        maxHeight: 250,
                    }}
                >
                    {things.map((thing) => {
                        return <>
                            <ThingDetails
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
                <AddThingButton onAddThingClicked={() => setAddThing(true)}/>
            </ListWrapper>
            {removedThing != null && <ConfirmModal onConfirm={onRemoveConfirmed} onCancel={onModalClosed}/>}
            {
                addThing && <AddThingModal devices={thingsToDeviceAdapter(things)}
                                           handleClose={() => setAddThing(false)}
                                           onAddThing={(deviceId: string | null, thingType: ThingType, thingName: string) => {
                                               console.log(`${thingType} and ${thingName}`);
                                               onAddThing(deviceId, thingType, thingName);
                                           }}/>
            }
        </ThingsPanelWrapper>
    );
}