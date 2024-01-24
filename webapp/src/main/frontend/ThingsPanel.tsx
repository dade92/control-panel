import {FC, useState} from "react";
import {ThingDetails} from "./ThingDetails";
import {Thing} from "./Thing";
import styled from "styled-components";
import {Divider, List} from "@mui/material";
import {RestSwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {AddThingButton} from "./AddThingButton";
import {ConfirmModal} from "./ConfirmModal";
import {Subtitle} from "./Subtitle";

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
    onThingRemoved: (thing: Thing) => void;
    idToBeRemoved: string;
}

export const ThingsPanel: FC<Props> = ({things, onChangeStatus, onThingRemoved, idToBeRemoved}) => {
    const [removedThing, setRemovedThing] = useState<Thing | null>(null);

    const onThingWaitingToBeRemoved = (thing: Thing) => {
        setRemovedThing(thing);
    }

    const onModalClosed = () => {
        setRemovedThing(null);
    }

    const onRemoveConfirmed = () => {
        onThingRemoved(removedThing!);
        setRemovedThing(null);
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
                                onChangeStatus={onChangeStatus} switchStatusProvider={RestSwitchStatusProvider}
                                onThingRemoved={onThingWaitingToBeRemoved}
                                shouldBeLoading={idToBeRemoved == thing.id}
                            />
                            <Divider/>
                        </>
                    })}
                </List>
                <AddThingButton onAddThingClicked={() => console.log('TODO!')}/>
            </ListWrapper>
            {removedThing != null && <ConfirmModal onConfirm={onRemoveConfirmed} onCancel={onModalClosed}/>}
        </ThingsPanelWrapper>
    );
}