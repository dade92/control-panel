import {useEffect, useState} from "react";
import {RetrieveThingsProvider, ThingsRetrieveResponse} from "./logic/RetrieveThingsProvider";
import {Thing, ThingStatus, ThingType} from "./Thing";
import {RemoveThingsProvider} from "./logic/RemoveThingsProvider";
import {SwitchAllOffProvider} from "./logic/SwitchAllOffProvider";

interface ControlPanelStore {
    state: {
        things: Thing[] | null;
        outcome: Outcome,
        idToBeRemoved: string | null;
        thingsOFF: Thing[] | null;
    }
    actions: {
        giveFeedback: (isSuccess: boolean, thing: Thing) => void;
        onThingAdded: (thing: Thing | null) => void;
        onThingRemoved: (thing: Thing) => void;
        onHostChanged: (newHost: string, deviceId: string) => void;
        onSwitchOffButtonClicked: () => void;
        resetDefaultOutcome: () => void;
    }
}

interface Outcome {
    isSuccess: boolean;
    error: boolean;
    message: string | null;
}

export const useControlPanelStore = (
    retrieveThingsProvider: RetrieveThingsProvider,
    removeThingsProvider: RemoveThingsProvider,
    switchAllOffProvider: SwitchAllOffProvider,
): ControlPanelStore => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const defaultOutcome = {isSuccess: false, error: false, message: null,};
    const [outcome, setOutcome] = useState<Outcome>(defaultOutcome);
    const [idToBeRemoved, setIdToBeRemoved] = useState<string | null>(null);
    const [thingsOFF, setThingsOFF] = useState<Thing[] | null>(null);

    useEffect(() => {
        retrieveThingsProvider()
            .then((response: ThingsRetrieveResponse) => {
                setThings(response.things);
            })
            .catch(() => {
                setOutcome({
                    isSuccess: false,
                    error: true,
                    message: 'There was an error retrieving Things',
                })
            })
    }, []);

    const isEligible = (thing: Thing) => thing.management.switch == ThingStatus.ON && thing.type == ThingType.LAMP

    const onThingRemoved = (thing: Thing) => {
        setIdToBeRemoved(thing.id);
        removeThingsProvider(thing.deviceId, thing.id)
            .then(() => {
                setThings(things!.filter((t) => t.id != thing.id));
                setOutcome({
                    isSuccess: true,
                    error: false,
                    message: `Thing ${thing.name} removed successfully`,
                });
            })
            .catch(() => {
                setOutcome({
                    isSuccess: false,
                    error: true,
                    message: `error while removing thing ${thing.name}`,

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
                `${thing!.name} couldn't be switched due to some problems with server`
        });
    }

    const updateThingsList = (newThing: Thing) => {
        things!.push(newThing);
        setThings(things);
    }

    const onThingAdded = (thing: Thing | null) => {
        if (thing) {
            updateThingsList(thing);
            setOutcome({
                isSuccess: true,
                error: false,
                message: `${thing!.name} added successfully`,
            })
        } else {
            setOutcome({
                isSuccess: false,
                error: true,
                message: `the new thing couldn't be added due to some problems with server`,
            })
        }
    }

    const onHostChanged = (newHost: string, deviceId: string) => {
        setThings(things!.map((t: Thing) => {
            if (t.deviceId == deviceId) {
                return {...t, deviceHost: newHost}
            } else {
                return t
            }
        }));
    }

    const onSwitchOffButtonClicked = () => {
        const thingsOFF = things!.filter((t: Thing) => isEligible(t));
        setThingsOFF(thingsOFF);
        switchAllOffProvider(thingsOFF)
            .then(() => {
                const newThings: Thing[] = [];
                things!.forEach((t: Thing) => {
                    if (isEligible(t)) {
                        t.management.switch = ThingStatus.OFF;
                    }
                    newThings.push(t);
                });
                setThingsOFF(null);
                setThings(newThings);
                setOutcome({
                    isSuccess: true,
                    error: false,
                    message: `All LAMPs switched off successfully`,
                })
            })
            .catch(() => {
                console.log('Error switching off all things');
                setOutcome({
                    isSuccess: false,
                    error: true,
                    message: `Some error occurred while switching off all LAMPs. Please reload the page and try again.`,
                })
                setThingsOFF(null);
            })
    }

    return {
        state: {
            things,
            outcome,
            idToBeRemoved,
            thingsOFF,
        },
        actions: {
            giveFeedback,
            onThingAdded,
            onThingRemoved,
            onHostChanged,
            onSwitchOffButtonClicked,
            resetDefaultOutcome: () => setOutcome(defaultOutcome),
        }
    }
}