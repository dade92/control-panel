import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import styled from "styled-components";

interface Props {
    message: string;
    onClose: () => void;
    isSuccess: boolean;
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const FeedbackMessage: FC<Props> = ({onClose, isSuccess, message}) => {
    const severity = isSuccess ? "success" : "error";

    return <Wrapper data-testid={`feedback-wrapper-${severity}`}>
        <Snackbar open={true} autoHideDuration={3000} onClose={onClose}>
            <Alert severity={severity} sx={{width: '100%'}}>
                {message}
            </Alert>
        </Snackbar>
    </Wrapper>
}