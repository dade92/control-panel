import {FC, useEffect, useState} from "react";
import {staticRestClient} from "./logic/RestClient";

interface ApiResponse {
    things: Thing[];
}

interface Thing {
    id: number,
    device: string,
    deviceId: string,
    type: ThingType,
    status: ThingStatus
}

enum ThingType {
    LAMP = "LAMP",
    ALARM = "ALARM"
}

interface ThingStatus {
    switch: string;
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

    return things == null ? <span>Loading</span> : <>
        {things?.map((t) => {
            return <><span>{t.id}</span><br></br></>
        })
        }
    </>;
}