import {fireEvent, screen, render} from "@testing-library/react";
import {SwitchOffButton} from "./SwitchOffButton";

describe('SwitchOffButton', () => {
    it('should call onSwitchOffClicked when clicked', () => {
        const onSwitchOffClicked = jest.fn();
        render(<SwitchOffButton onSwitchOffClicked={onSwitchOffClicked}/>);

        fireEvent.click(screen.getByTestId('switch-off-button'));

        expect(onSwitchOffClicked).toHaveBeenCalled();
    });
});