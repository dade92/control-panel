import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./components/organisms/ControlPanel";
import styled from "styled-components";
import {RestRetrieveThingsProvider} from "./logic/providers/RetrieveThingsProvider";
import {RestRemoveThingsProvider} from "./logic/providers/RemoveThingsProvider";
import {RestSwitchStatusProvider} from "./logic/providers/SwitchStatusProvider";
import {RestAddThingProvider} from "./logic/providers/AddThingProvider";
import {RestSwitchAllOffProvider} from "./logic/providers/SwitchAllOffProvider";

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