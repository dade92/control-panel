import {FC, useState} from "react";
import {Management, Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {Paragraph} from "./Texts";
import {SwitchStatusProvider} from "./SwitchStatusProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';

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
  align-items: center;
  padding: 8px;
`

export const ThingDetails: FC<Props> = ({thing, onChangeStatus, switchStatusProvider, onThingRemoved}) => {
    const [status, setStatus] = useState<Management>(thing.management);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

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

    const onRemoved = (thing: Thing) => {
        setLoading(true);
        onThingRemoved(thing);
    }

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            <Paragraph data-testid={'type'}>{thing.type}</Paragraph>
            <Paragraph data-testid={'name'}>{thing.name}</Paragraph>
            <Switch checked={status.switch === ThingStatus.ON} disabled={disabled} onChange={changeStatus}/>
            <LoadingButton
                data-testid={`cancel-button-${thing.id}`}
                size="large"
                onClick={() => onRemoved(thing)}
                loading={false}
                color={'error'}
                startIcon={<DeleteIcon/>}
                disabled={false}
            />
        </Wrapper>
    </>
}