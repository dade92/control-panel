import {FC, useState} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./components/organisms/ControlPanel";
import styled from "styled-components";
import {RestRetrieveThingsProvider} from "./logic/providers/RetrieveThingsProvider";
import {RestRemoveThingsProvider} from "./logic/providers/RemoveThingsProvider";
import {RestSwitchStatusProvider} from "./logic/providers/SwitchStatusProvider";
import {RestAddThingProvider} from "./logic/providers/AddThingProvider";
import {RestSwitchAllOffProvider} from "./logic/providers/SwitchAllOffProvider";
import {Navigation} from "./components/molecules/Navigation";

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

enum NavigationStatus {
    CONTROL_PANEL,
    FAVOURITES,
    NEW_STUFF
}

export const AppRouting: FC = () => {
    const [navigationStatus, setNavigationStatus] = useState(NavigationStatus.CONTROL_PANEL);

    return <Wrapper>
        {navigationStatus == NavigationStatus.CONTROL_PANEL && <ControlPanel
            retrieveThingsProvider={RestRetrieveThingsProvider}
            removeThingsProvider={RestRemoveThingsProvider}
            switchStatusProvider={RestSwitchStatusProvider}
            addThingProvider={RestAddThingProvider}
            switchAllOffProvider={RestSwitchAllOffProvider}
        />}
        {navigationStatus == NavigationStatus.FAVOURITES && <div data-testid={'favourites-wrapper'}>Favourites</div>}
        {navigationStatus == NavigationStatus.NEW_STUFF && <div data-testid={'new-stuff-wrapper'}>New stuff</div>}
        <Navigation onNavigationChange={(index) => setNavigationStatus(index)}/>
    </Wrapper>;
}
