import {FC} from "react";
import {Typography} from "@mui/material";

interface Props {
    subtitle: string;
}

export const Subtitle: FC<Props> = ({subtitle}) => {
    return <Typography variant="h2" gutterBottom>
        {subtitle}
    </Typography>
}