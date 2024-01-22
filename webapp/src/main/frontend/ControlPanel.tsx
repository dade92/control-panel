import {FC, useEffect, useState} from "react";
import {Thing} from "./Thing";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";
import {ThingsPanel} from "./ThingsPanel";
import {RetrieveThingsProvider} from "./logic/RetrieveThingsProvider";

interface Props {
    retrieveThingsProvider: RetrieveThingsProvider;
}

export const ControlPanel: FC<Props> = ({retrieveThingsProvider}) => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const [changedThing, setChangedThing] = useState<Thing>();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        retrieveThingsProvider()
            .then((response) => {
                setThings(response.things);
            })
            .catch(() => console.log('Error retrieving things'))
    }, []);

    const onThingRemoved = (thing: Thing) => {
        //TODO make the rest call here to remove from the model the Thing
        setThings(things!.filter((t) => t.id != thing.id));
    }

    const giveFeedback = (isSuccess: boolean, thing: Thing) => {
        setChangedThing(thing);
        if (isSuccess) {
            setSuccess(isSuccess);
        } else {
            setError(true);
        }
    }

    return things == null ? <Loader/> :
        <> <ThingsPanel
            things={things}
            onChangeStatus={(isSuccess: boolean, thing: Thing) => giveFeedback(isSuccess, thing)}
            onThingRemoved={onThingRemoved}
        />
            {success && <FeedbackMessage thing={changedThing!} onClose={() => setSuccess(false)} isSuccess={success}/>}
            {error && <FeedbackMessage thing={changedThing!} onClose={() => setError(false)} isSuccess={success}/>}
        </>;
}