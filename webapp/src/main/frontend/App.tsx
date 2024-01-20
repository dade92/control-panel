import {FC} from "react";

interface Props {
    randomText: string;
}

export const App: FC<Props> = ({randomText}) => (
        <span data-testid={'title'}>{randomText}</span>
    )