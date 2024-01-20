import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import styled from "styled-components";
import {Thing} from "./Thing";

interface Props {
    onClose: () => void;
    isSuccess: boolean;
    thing: Thing;
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const FeedbackMessage: FC<Props> = ({onClose, isSuccess, thing}) => {
    const severity = isSuccess ? "success" : "error";
    const message = isSuccess ? `${thing.type} turned ${thing.status.switch}` :
        `${thing.type} couldn't be switched due to some problems with server`;

    return <Wrapper>
        <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
            <Alert severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    </Wrapper>
}