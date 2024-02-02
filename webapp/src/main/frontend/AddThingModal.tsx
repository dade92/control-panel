import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

interface Props {
    handleClose: () => void;
}
styled(Dialog)`
  width: 400px;
  height: 300px;
  margin: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%); // Center vertically
`;
export const AddThingModal: FC<Props> = ({handleClose}) => {
    return <Dialog data-testid={'add-thing-modal'} open={true}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Add a thing</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon/>
        </IconButton>
        <DialogContent dividers={true}>
            <Wrapper>
                <span>prova</span>
                <span>prova</span>
            </Wrapper>
        </DialogContent>
        <DialogActions>
            <Button data-testid={'confirm-button'} onClick={() => console.log('YES!')}>Yes</Button>
        </DialogActions>
    </Dialog>
}