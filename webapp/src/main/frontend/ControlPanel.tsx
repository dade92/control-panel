import {FC, useEffect, useState} from "react";
import {staticRestClient} from "./logic/RestClient";
import {Thing} from "./Thing";
import {Loader} from "./Loader";
import {FeedbackMessage} from "./FeedbackMessage";
import {ThingsPanel} from "./ThingsPanel";

interface ApiResponse {
    things: Thing[];
}

export const ControlPanel: FC = () => {
    const [things, setThings] = useState<Thing[] | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    //TODO need to know which thing changed status!
    const giveFeedback = (isSuccess: boolean, thing: Thing) => {
        if(isSuccess) {
            setSuccess(isSuccess);
        } else {
            setError(true);
        }
    }

    useEffect(() => {
        staticRestClient.get<ApiResponse>('/v1/things')
            .then((response) => {
                setThings(response.things);
            })
            .catch(() => console.log('Error retrieving things'))
    }, []);

    return things == null ? <Loader/> : <>
        <ThingsPanel things={things}
                     onChangeStatus={(isSuccess: boolean, thing: Thing) => giveFeedback(isSuccess, thing)}/>
        {success && <FeedbackMessage onClose={() => setSuccess(false)} isSuccess={success}/>}
        {error && <FeedbackMessage onClose={() => setError(false)} isSuccess={success}/>}
    </>;
}