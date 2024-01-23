import {FC, ReactNode} from "react";
import {Typography} from "@mui/material";

export const ThingDetailText: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography sx={{maxWidth: '30px'}} variant="body1" gutterBottom>{children}</Typography>
}