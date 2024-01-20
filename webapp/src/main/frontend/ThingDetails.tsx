import {FC, useState} from "react";
import {Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";
import {staticRestClient} from "./logic/RestClient";

interface Props {
    thing: Thing;
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`

export const ThingDetails: FC<Props> = ({thing, onChangeStatus}) => {
    const [status, setStatus] = useState<ThingStatus>(thing.status);

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
        staticRestClient.post(`/v1/switch/${thing.deviceId}/${thing.id}`, status)
            .then(() => onChangeStatus(true, thing))
            .catch(() => {
                onChangeStatus(false, thing);
                status.switch = oldStatus;
                setStatus({switch: oldStatus});
            });
    }

    return <>
        <Wrapper>
            <span>{thing.id}</span>
            <span>{thing.type}</span>
            <span>{status.switch}</span>
            <Switch checked={status.switch === "ON"} onChange={changeStatus}/>
        </Wrapper>
    </>
}