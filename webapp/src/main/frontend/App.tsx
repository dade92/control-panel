import {FC} from "react";
import {server} from "./server/Server";
import {ControlPanel} from "./ControlPanel";
import styled from "styled-components";

interface Props {
    randomText: string;
}

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_STAGE === 'dev') {
    console.log('Local dev mode detected, starting mirage server...');
    server();
}

const AppWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  width: 40%;
  @media screen and (max-width: 600px) {
    width: 50%;
  }
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const App: FC<Props> = ({randomText}) => {
    return <AppWrapper>
        <ControlPanel/>
    </AppWrapper>;
}