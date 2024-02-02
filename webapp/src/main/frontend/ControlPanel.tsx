import {FC, useEffect, useState} from "react";
import {Thing} from "./Thing";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";
import {ThingsPanel} from "./ThingsPanel";
import {RetrieveThingsProvider, ThingsRetrieveResponse} from "./logic/RetrieveThingsProvider";
import {RemoveThingsProvider} from "./logic/RemoveThingsProvider";
import {SwitchStatusProvider} from "./logic/SwitchStatusProvider";
import {AddThingProvider} from "./logic/AddThingProvider";

interface Props {
    retrieveThingsProvider: RetrieveThingsProvider;
    removeThingsProvider: RemoveThingsProvider;
    switchStatusProvider: SwitchStatusProvider;
    addThingProvider: AddThingProvider;
}

interface Outcome {
    isSuccess: boolean;
    error: boolean;
    message: string | null;
    changedThing: Thing | null;
}

export const ControlPanel: FC<Props> = ({retrieveThingsProvider, removeThingsProvider, switchStatusProvider, addThingProvider}) => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const defaultOutcome = {isSuccess: false, error: false, message: null, changedThing: null};
    const [outcome, setOutcome] = useState<Outcome>(defaultOutcome);
    const [idToBeRemoved, setIdToBeRemoved] = useState<string | null>(null);

    useEffect(() => {
        retrieveThingsProvider()
            .then((response:ThingsRetrieveResponse) => {
                setThings(response.things);
            })
            .catch(() => {
                setOutcome({
                    isSuccess: false,
                    error: true,
                    message: 'There was an error retrieving Things',
                    changedThing: null
                })
            })
    }, []);

    const onThingRemoved = (thing: Thing) => {
        setIdToBeRemoved(thing.id);
        removeThingsProvider(thing.deviceId, thing.id)
            .then(() => {
                setThings(things!.filter((t) => t.id != thing.id));
                setOutcome({
                    isSuccess: true,
                    error: false,
                    message: `Thing ${thing.name} removed successfully`,
                    changedThing: null
                });
            })
            .catch(() => {
                setOutcome({
                    isSuccess: false,
                    error: true,
                    message: `error while removing thing ${thing.name}`,
                    changedThing: null
                });
            }).finally(() => {
            setIdToBeRemoved(null);
        });
    }

    const giveFeedback = (isSuccess: boolean, thing: Thing) => {
        setOutcome({
            isSuccess,
            error: !isSuccess,
            message: isSuccess ?
                `${thing!.name} turned ${thing!.management.switch}` :
                `${thing!.name} couldn't be switched due to some problems with server`,
            changedThing: thing
        });
    }

    return things == null ? <Loader/> :
        <>
            <ThingsPanel
                things={things}
                onChangeStatus={giveFeedback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
                idWaitingToBeRemoved={idToBeRemoved}
            />
            {
                outcome?.isSuccess && <FeedbackMessage
                    message={outcome.message!}
                    onClose={() => setOutcome(defaultOutcome)}
                    isSuccess={outcome.isSuccess}/>
            }
            {
                outcome?.error && <FeedbackMessage
                    message={outcome.message!}
                    onClose={() => setOutcome(defaultOutcome)}
                    isSuccess={outcome.isSuccess}/>
            }
        </>
}