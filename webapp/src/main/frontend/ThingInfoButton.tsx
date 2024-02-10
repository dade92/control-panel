import {FC} from "react";
import {Button} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

interface Props {
    onClick: () => void;
}

export const ThingInfoButton: FC<Props> = ({onClick}) =>
    <Button onClick={onClick} startIcon={<InfoIcon/>} sx={{minWidth:'0px', padding:'0px'}}/>