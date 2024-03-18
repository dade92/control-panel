import {FC, ReactNode} from "react";
import {TextField, Typography} from "@mui/material";

export const ThingDetailText: FC<{ children: ReactNode }> = ({children}) =>
    <Typography sx={{width: '100px'}}
                variant="body1"
                gutterBottom>{children}</Typography>

export const ThingPanelText: FC<{ children: ReactNode }> = ({children}) =>
    <Typography sx={{textAlign: 'center'}} data-testid={'no-thing-text'} variant="body1"
                gutterBottom>{children}</Typography>

export const InfoLabelText: FC<{ text: string }> = ({text}) =>
    <Typography color={'#717070'} sx={{width: "100px"}} gutterBottom>{text}</Typography>

interface Props {
    host: string;
    onChange: (newHost: string) => void;
}

export const DeviceHostTextField: FC<Props> = ({host, onChange, children}) =>
    <TextField
        data-testid={'info-thing-device-host'}
        size="small" variant="standard"
        sx={{input: {color: '#717070'}, marginTop: '0px'}}
        value={host} onChange={(e) => onChange(e.target.value)}
    >{children}</TextField>