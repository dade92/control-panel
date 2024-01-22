import {FC} from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";

const Wrapper = styled.div`
    align-self: end;
`

export const AddThingButton: FC = () => {
    return <Wrapper>
        <Fab color="success" aria-label="add">
            <AddIcon />
        </Fab>
    </Wrapper>
}