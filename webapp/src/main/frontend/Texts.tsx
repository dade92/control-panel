import {FC, ReactNode} from "react";
import {Typography} from "@mui/material";

export const ThingDetailText: FC<{ children: ReactNode }> = ({children}) =>
    <Typography sx={{width: '70px'}}
                variant="body1"
                gutterBottom>{children}</Typography>

export const ThingPanelText: FC<{ children: ReactNode }> = ({children}) =>
    <Typography sx={{textAlign: 'center'}} data-testid={'no-thing-text'} variant="body1"
                gutterBottom>{children}</Typography>

export const InfoLabelText: FC<{ text: string }> = ({text}) =>
    <Typography color={'#717070'} sx={{width: "56px"}} gutterBottom>{text}</Typography>