import {FC, useEffect, useState} from "react";
import {staticRestClient} from "./logic/RestClient";
import {Thing} from "./Thing";
import {ThingDetails} from "./ThingDetails";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";

interface ApiResponse {
    things: Thing[];
}

export const ControlPanel: FC = () => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const giveFeedback = (isSuccess: boolean, thing: Thing) => {
        setSuccess(isSuccess);
    }

    useEffect(() => {
        staticRestClient.get<ApiResponse>('/v1/things')
            .then((response) => {
                setThings(response.things);
            })
            .catch(() => console.log('Error retrieving things'))
    }, []);

    return things == null ? <Loader/> : <>
        {things.map((t) => {
            return <ThingDetails thing={t}
                                 onChangeStatus={(isSuccess: boolean, thing: Thing) => giveFeedback(isSuccess, thing)}/>
        })}
        {success && <FeedbackMessage onClose={() => setSuccess(false)} isSuccess={success}/>}
        {error && <FeedbackMessage onClose={() => setSuccess(false)} isSuccess={success}/>}
    </>;
}