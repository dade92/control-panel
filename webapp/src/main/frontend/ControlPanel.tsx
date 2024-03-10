import {FC, useEffect, useState} from "react";
import {Thing, ThingStatus} from "./Thing";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";
import {ThingsPanel} from "./ThingsPanel";
import {RetrieveThingsProvider, ThingsRetrieveResponse} from "./logic/RetrieveThingsProvider";
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

interface Outcome {
    isSuccess: boolean;
    error: boolean;
    message: string | null;
}

export const ControlPanel: FC<Props> = ({
                                            retrieveThingsProvider,
                                            removeThingsProvider,
                                            switchStatusProvider,
                                            addThingProvider,
                                            switchAllOffProvider
                                        }) => {
    const {state, actions} = useControlPanelStore(retrieveThingsProvider, removeThingsProvider, switchAllOffProvider);

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