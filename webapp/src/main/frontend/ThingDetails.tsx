import {FC, useState} from "react";
import {Management, Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {IconButton, Switch} from "@mui/material";
import {Paragraph} from "./Texts";
import {SwitchStatusProvider} from "./SwitchStatusProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import {ConfirmModal} from "./ConfirmModal";

interface Props {
    thing: Thing;
    switchStatusProvider: SwitchStatusProvider;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
    onThingRemoved: (thing: Thing) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px;
`

export const ThingDetails: FC<Props> = ({thing, onChangeStatus, switchStatusProvider, onThingRemoved}) => {
    const [status, setStatus] = useState<Management>(thing.management);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [askConfirmation, setAskConfirmation] = useState<boolean>(false);

    const changeStatus = () => {
        console.log('status changed')
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
                onChangeStatus(true, thing)
            })
            .catch(() => {
                onChangeStatus(false, thing);
                setStatus({switch: oldStatus});
            }).finally(() => {
            setDisabled(false);
        });
    }

    const onClose = () => {
        setAskConfirmation(false);
    }

    const onConfirm = () => {
        setAskConfirmation(false);
        onThingRemoved(thing);
    }

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            <Paragraph data-testid={'type'}>{thing.type}</Paragraph>
            <Paragraph data-testid={'status'}>{status.switch}</Paragraph>
            <Switch checked={status.switch === ThingStatus.ON} disabled={disabled} onChange={changeStatus}/>
            <IconButton aria-label="delete" size="large" color={'default'} onClick={() => setAskConfirmation(true)}>
                <DeleteIcon/>
            </IconButton>
            {askConfirmation && <ConfirmModal onConfirm={onConfirm} onCancel={onClose}/>}
        </Wrapper>
    </>
}