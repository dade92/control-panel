import {FC, useState} from "react";
import {ThingDetails} from "./ThingDetails";
import {Thing} from "./Thing";
import styled from "styled-components";
import {Divider, List} from "@mui/material";
import {Subtitle} from "./Texts";
import {RestSwitchStatusProvider} from "./SwitchStatusProvider";
import {AddThingButton} from "./AddThingButton";
import {ConfirmModal} from "./ConfirmModal";

const ThingsPanelWrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 40%;
  @media screen and (max-width: 600px) {
    width: 80%;
  }
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.21);
  padding: 8px;
`

interface Props {
    things: Thing[];
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
    onThingRemoved: (thing: Thing) => void;
}

export const ThingsPanel: FC<Props> = ({things, onChangeStatus, onThingRemoved}) => {
    const [removedThing, setRemovedThing] = useState<Thing | null>(null);

    const onThingWaitingToBeRemoved = (thing: Thing) => {
        setRemovedThing(thing);
    }

    const onClose = () => {
        setRemovedThing(null);
    }

    const onConfirm = () => {
        //TODO change the icon to loading!
        onThingRemoved(removedThing!);
        setRemovedThing(null);
    }

    return (
        <ThingsPanelWrapper data-testid={'things-panel-wrapper'}>
            <Subtitle>Control Panel</Subtitle>
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
                            />
                            <Divider/>
                        </>
                    })}
                </List>
                <AddThingButton onAddThingClicked={() => console.log('TODO!')}/>
            </ListWrapper>
            {removedThing != null && <ConfirmModal onConfirm={onConfirm} onCancel={onClose}/>}
        </ThingsPanelWrapper>
    );
}