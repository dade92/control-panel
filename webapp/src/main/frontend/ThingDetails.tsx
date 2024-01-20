import {FC, useState} from "react";
import {Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Card, Switch} from "@mui/material";
import {staticRestClient} from "./logic/RestClient";
import {Paragraph} from "./Texts";

interface Props {
    thing: Thing;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  padding: 8px;
`

export const ThingDetails: FC<Props> = ({thing, onChangeStatus}) => {
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
        staticRestClient.post(`/v1/switch/${thing.deviceId}/${thing.id}`, status)
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
        <Wrapper>
            <Paragraph>{thing.id}</Paragraph>
            <Paragraph>{thing.type}</Paragraph>
            <Paragraph>{status.switch}</Paragraph>
            <Switch checked={status.switch === "ON"} disabled={disabled} onChange={changeStatus}/>
        </Wrapper>
    </>
}