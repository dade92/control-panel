import {FC, useState} from "react";
import {Thing, ThingStatus} from "./Thing";
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
    const [status, setStatus] = useState<ThingStatus>(thing.status);
    const [disabled, setDisabled] = useState<boolean>(false);

    const changeStatus = () => {
        let newStatus = "";
        let oldStatus = status.switch;
        if (status.switch == "ON") {
            newStatus = "OFF";
        } else {
            newStatus = "ON";
        }
        thing.status.switch = newStatus;
        setStatus({switch: newStatus});
        setDisabled(true);
        switchStatusProvider(thing, {switch: newStatus})
            .then(() => onChangeStatus(true, thing))
            .catch(() => {
                onChangeStatus(false, thing);
                status.switch = oldStatus;
                setStatus({switch: oldStatus});
            }).finally(() => {
            setDisabled(false);
        });
    }

    return <>
        <Wrapper data-testid={'thing-wrapper'}>
            <Paragraph data-testid={'thing-id'}>{thing.id}</Paragraph>
            <Paragraph data-testid={'type'}>{thing.type}</Paragraph>
            <Paragraph data-testid={'status'}>{status.switch}</Paragraph>
            <Switch checked={status.switch === "ON"} disabled={disabled} onChange={changeStatus}/>
        </Wrapper>
    </>
}