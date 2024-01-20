import {FC, useEffect, useState} from "react";
import {staticRestClient} from "./logic/RestClient";
import {Thing} from "./Thing";
import {ThingDetails} from "./ThingDetails";
import {Loader} from "./Loader";

interface ApiResponse {
    things: Thing[];
}

export const ControlPanel: FC = () => {
    const [things, setThings] = useState<Thing[] | null>(null);

    useEffect(() => {
        staticRestClient.get<ApiResponse>('/v1/things')
            .then((response) => {
                setThings(response.things);
            })
            .catch(() => console.log('Error retrieving things'))
    }, []);

    return things == null ? <Loader/> : <>
        {things.map((t) => {
            return <ThingDetails thing={t}/>
        })}
    </>;
}