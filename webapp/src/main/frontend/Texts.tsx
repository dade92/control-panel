import {FC, ReactNode} from "react";
import {Typography} from "@mui/material";

export const ThingDetailText: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography sx={{width: '70px'}} variant="body1" gutterBottom>{children}</Typography>
}

export const ThingPanelText: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography sx={{textAlign: 'center'}} data-testid={'no-thing-text'} variant="body1"
                       gutterBottom>{children}</Typography>
}