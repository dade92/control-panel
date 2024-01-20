import {FC, useState} from "react";
import {Thing, ThingStatus} from "./Thing";
import styled from "styled-components";
import {Switch} from "@mui/material";

interface Props {
    thing: Thing;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`

export const ThingDetails: FC<Props> = ({thing}) => {
    const [status, setStatus] = useState<ThingStatus>(thing.status)

    return <Wrapper>
        <span>{thing.id}</span>
        <span>{thing.type}</span>
        <span>{thing.status.switch}</span>
        <Switch/>
    </Wrapper>
}