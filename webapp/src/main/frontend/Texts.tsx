import {FC, ReactNode} from "react";
import {Typography} from "@mui/material";

export const Paragraph: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography sx={{maxWidth: '30px'}} variant="body1" gutterBottom>{children}</Typography>
}

export const Subtitle: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography variant="h2" gutterBottom>
        Control Panel
    </Typography>
}