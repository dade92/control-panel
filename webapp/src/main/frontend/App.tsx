import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./ControlPanel";
import {Typography} from "@mui/material";

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}


export const App: FC = () => {

    return <>
        <Typography variant="h2" gutterBottom>
            Control Panel
        </Typography>
        <ControlPanel/>
    </>
}