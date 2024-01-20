import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./ControlPanel";
import styled from "styled-components";

interface Props {
    randomText: string;
}

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}


export const App: FC = () => {
    return <ControlPanel/>
}