import {FC} from "react";
import {Dialog, DialogTitle} from "@mui/material";
import {Thing} from "./Thing";

interface Props {
    thing: Thing;
}

export const InfoThingModal: FC<Props> = ({thing}) => {
    return <Dialog open={true}>
        <DialogTitle>Info about thing {thing.name}</DialogTitle>
    </Dialog>
}