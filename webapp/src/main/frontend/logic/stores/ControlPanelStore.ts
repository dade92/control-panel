import {useEffect, useState} from "react";
import {RetrieveThingsProvider, ThingsRetrieveResponse} from "../providers/RetrieveThingsProvider";
import {Thing, ThingStatus, ThingType} from "../Types";
import {RemoveThingsProvider} from "../providers/RemoveThingsProvider";
import {SwitchAllOffProvider} from "../providers/SwitchAllOffProvider";

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

export enum OutcomeType {
    SUCCESS = 'success',
    ERROR = 'error',
    NONE = 'none',
}

interface Outcome {
    message: string | null;
    outcomeType: OutcomeType;
}

export const useControlPanelStore = (
    retrieveThingsProvider: RetrieveThingsProvider,
    removeThingsProvider: RemoveThingsProvider,
    switchAllOffProvider: SwitchAllOffProvider,
): ControlPanelStore => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const defaultOutcome = {isSuccess: false, error: false, message: null, outcomeType: OutcomeType.NONE};
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
                    message: 'There was an error retrieving Things',
                    outcomeType: OutcomeType.ERROR,
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
                    message: `Thing ${thing.name} removed successfully`,
                    outcomeType: OutcomeType.SUCCESS,
                });
            })
            .catch(() => {
                setOutcome({
                    message: `error while removing thing ${thing.name}`,
                    outcomeType: OutcomeType.ERROR,

                });
            }).finally(() => {
            setIdToBeRemoved(null);
        });
    }

    const giveFeedback = (isSuccess: boolean, thing: Thing) => {
        let outcomeType: OutcomeType;
        if (isSuccess) {
            outcomeType = OutcomeType.SUCCESS;
        } else {
            outcomeType = OutcomeType.ERROR;
        }
        setOutcome({
            message: isSuccess ?
                `${thing!.name} turned ${thing!.management.switch}` :
                `${thing!.name} couldn't be switched due to some problems with server`,
            outcomeType,
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
                message: `${thing!.name} added successfully`,
                outcomeType: OutcomeType.SUCCESS,
            })
        } else {
            setOutcome({
                message: `the new thing couldn't be added due to some problems with server`,
                outcomeType: OutcomeType.ERROR,
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
                setThings(things!.map((t: Thing) => {
                    if (isEligible(t)) {
                        t.management.switch = ThingStatus.OFF;
                    }
                    return t;
                }));
                setOutcome({
                    message: `All LAMPs switched off successfully`,
                    outcomeType: OutcomeType.SUCCESS,
                })
            })
            .catch(() => {
                console.log('Error switching off all things');
                setOutcome({
                    message: `Some error occurred while switching off LAMPs. Please reload the page and try again.`,
                    outcomeType: OutcomeType.ERROR,
                })
            }).finally(() => {
            setThingsOFF(null);
        });
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