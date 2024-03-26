import {render} from "@testing-library/react";
import {FC, ReactElement, ReactNode} from "react";
import {StompSessionProvider} from "react-stomp-hooks";

const customRender = (ui: ReactElement) => {
    const ContextWrapper: FC<{ children: ReactNode }> = ({children}) => (
        <StompSessionProvider url={''}>
            {children}
        </StompSessionProvider>
    );

    return render(ui, {
        wrapper: ContextWrapper
    });
}

export {customRender as render};