import {FC} from "react";
import styled from "styled-components";
import {CircularProgress, circularProgressClasses} from "@mui/material";

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`

export const Loader: FC = () =>
    <LoaderWrapper data-testid={'loader-wrapper'}>
        <CircularProgress
            data-testid='loader'
            variant="indeterminate"
            disableShrink
            sx={{
                color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                animationDuration: '550ms',
                [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                },
            }}
            size={40}
            thickness={5}
        />
    </LoaderWrapper>