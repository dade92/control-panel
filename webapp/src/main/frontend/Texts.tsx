import {FC, ReactElement, ReactNode} from "react";
import {Typography} from "@mui/material";

export const Paragraph: FC<{children: ReactNode}> = ({children}) => {
    return <Typography variant="body1" gutterBottom>{children}</Typography>
}