import {FC} from "react";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";
import {ThingsPanel} from "./ThingsPanel";
import {RetrieveThingsProvider} from "./logic/RetrieveThingsProvider";
import {RemoveThingsProvider} from "./logic/RemoveThingsProvider";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {AddThingProvider} from "./logic/AddThingProvider";
import {RestChangeHostProvider} from "./logic/ChangeHostProvider";
import {SwitchAllOffProvider} from "./logic/SwitchAllOffProvider";
import {useControlPanelStore} from "./ControlPanelStore";

interface Props {
    retrieveThingsProvider: RetrieveThingsProvider;
    removeThingsProvider: RemoveThingsProvider;
    switchStatusProvider: SwitchStatusProvider;
    addThingProvider: AddThingProvider;
    switchAllOffProvider: SwitchAllOffProvider
}

export const ControlPanel: FC<Props> = ({
                                            retrieveThingsProvider,
                                            removeThingsProvider,
                                            switchStatusProvider,
                                            addThingProvider,
                                            switchAllOffProvider
                                        }) => {
    const {state, actions} = useControlPanelStore(
        retrieveThingsProvider,
        removeThingsProvider,
        switchAllOffProvider
    );

    return state.things == null ? <Loader/> :
        <>
            <ThingsPanel
                things={state.things}
                onChangeStatus={actions.giveFeedback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={actions.onThingRemoved}
                idWaitingToBeRemoved={state.idToBeRemoved}
                addThingProvider={addThingProvider}
                onThingAdded={actions.onThingAdded}
                onHostChanged={actions.onHostChanged}
                changeHostProvider={RestChangeHostProvider}
                onSwitchOffButtonClicked={actions.onSwitchOffButtonClicked}
                thingsOFF={state.thingsOFF}
            />
            {
                state.outcome?.isSuccess && <FeedbackMessage
                    message={state.outcome.message!}
                    onClose={() => actions.resetDefaultOutcome()}
                    isSuccess={state.outcome.isSuccess}/>
            }
            {
                state.outcome?.error && <FeedbackMessage
                    message={state.outcome.message!}
                    onClose={() => actions.resetDefaultOutcome()}
                    isSuccess={state.outcome.isSuccess}/>
            }
        </>
}