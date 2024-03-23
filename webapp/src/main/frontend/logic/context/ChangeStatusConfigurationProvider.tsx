import {StompSessionProvider} from "react-stomp-hooks";
import {FC, ReactNode} from "react";

export const ChangeStatusConfigurationProvider: FC<{ children: ReactNode }> = ({children}) => (
    <StompSessionProvider url={"/ws-message"}>
        {children}
    </StompSessionProvider>
)