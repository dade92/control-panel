import {FC} from "react";
import {ThingDetails} from "./ThingDetails";
import {Thing} from "./Thing";
import styled from "styled-components";
import {List, ListItem} from "@mui/material";

const AppWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 40%;
  @media screen and (max-width: 600px) {
    width: 50%;
  }
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

interface Props {
    things: Thing[];
    onChangeStatus: (isSuccess: boolean, thing: Thing) => void;
}

export const ThingsPanel: FC<Props> = ({things, onChangeStatus}) => {
    return (
        <AppWrapper>
            <List
                sx={{
                    width: '100%',
                    overflow: 'auto',
                    maxHeight: 250,
                }}
            >
                {things.map((t) => {
                    return <ThingDetails thing={t} onChangeStatus={onChangeStatus}/>
                })}
            </List>
        </AppWrapper>
    )
}