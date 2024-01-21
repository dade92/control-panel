import {FC, useState} from "react";
import {Management, Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {Paragraph} from "./Texts";
import {SwitchStatusProvider} from "./SwitchStatusProvider";

interface Props {
    thing: Thing;
    switchStatusProvider: SwitchStatusProvider;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px;
`

export const ThingDetails: FC<Props> = ({thing, onChangeStatus, switchStatusProvider}) => {
    const [status, setStatus] = useState<Management>(thing.management);
    const [disabled, setDisabled] = useState<boolean>(false);

    console.log('rendering ')

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

    return <>
        <Wrapper data-testid={`thing-wrapper-${thing.id}`}>
            <Paragraph data-testid={'thing-id'}>{thing.id}</Paragraph>
            <Paragraph data-testid={'type'}>{thing.type}</Paragraph>
            <Paragraph data-testid={'status'}>{status.switch}</Paragraph>
            <Switch checked={status.switch === ThingStatus.ON} disabled={disabled} onChange={changeStatus}/>
        </Wrapper>
    </>
}