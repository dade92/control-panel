import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./ControlPanel";
import styled from "styled-components";
import {RestRetrieveThingsProvider} from "./logic/RetrieveThingsProvider";
import {RestRemoveThingsProvider} from "./logic/RemoveThingsProvider";
import {RestSwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {RestAddThingProvider} from "./logic/AddThingProvider";
import {RestSwitchAllOffProvider} from "./logic/SwitchAllOffProvider";

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
        <ControlPanel
            retrieveThingsProvider={RestRetrieveThingsProvider}
            removeThingsProvider={RestRemoveThingsProvider}
            switchStatusProvider={RestSwitchStatusProvider}
            addThingProvider={RestAddThingProvider}
            switchAllOffProvider={RestSwitchAllOffProvider}
        />
    </Wrapper>
}