import {FC} from "react";
import {Alert, Snackbar} from "@mui/material";
import styled from "styled-components";

interface Props {
    onClose: () => void;
    isSuccess: boolean;
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

export const FeedbackMessage: FC<Props> = ({onClose, isSuccess}) => {
    const severity = isSuccess ? "success" : "error";

    return <Wrapper>
        <Snackbar open={true} autoHideDuration={1000} onClose={onClose}>
            <Alert severity={severity} sx={{width: '100%'}}>
                Turned on!
            </Alert>
        </Snackbar>
    </Wrapper>
}