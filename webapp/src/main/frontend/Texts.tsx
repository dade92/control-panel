import {FC, ReactNode} from "react";
import {Typography} from "@mui/material";

export const ThingDetailText: FC<{ children: ReactNode }> = ({children}) => {
    return <Typography sx={{width: '70px'}} variant="body1" gutterBottom>{children}</Typography>
}