import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./ControlPanel";
import {Typography} from "@mui/material";
import styled from "styled-components";

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`


export const App: FC = () => {

    return <Wrapper>
        <ControlPanel/>
    </Wrapper>
}