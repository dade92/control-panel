import {FC} from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";

interface Props {
    onAddThingClicked: () => void;
}

const Wrapper = styled.div`
    align-self: end;
`

export const AddThingButton: FC<Props> = ({onAddThingClicked}) => {
    return <Wrapper>
        <Fab onClick={onAddThingClicked} color="success" aria-label="add">
            <AddIcon />
        </Fab>
    </Wrapper>
}