import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import {Thing} from "./Thing";

interface Props {
    onClose: () => void;
    isSuccess: boolean;
}

export const FeedbackMessage: FC<Props> = ({onClose, isSuccess}) => {
    const severity = isSuccess ? "success" : "error";

    return <Snackbar open={true} autoHideDuration={1000} onClose={onClose}>
        <Alert severity={severity} sx={{width: '100%'}}>
            Turned on!
        </Alert>
    </Snackbar>
}