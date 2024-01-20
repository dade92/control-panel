import {FC, useEffect} from "react";
import {staticRestClient} from "./logic/RestClient";
import {server} from "./server/Server";

interface Props {
    randomText: string;
}

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}

export const App: FC<Props> = ({randomText}) => {
    useEffect(() => {
        staticRestClient.get('/v1/things')
    }, []);

    return (
        <span data-testid={'title'}>{randomText}</span>
    );
}