import {fireEvent, render} from "@testing-library/react";
import {SwitchOffButton} from "./SwitchOffButton";

describe('SwitchOffButton', () => {
    it('should call onSwitchOffClicked when clicked', () => {
        const onSwitchOffClicked = jest.fn();
        const {getByTestId} = render(<SwitchOffButton onSwitchOffClicked={onSwitchOffClicked}/>);

        fireEvent.click(getByTestId('switch-off-button'));

        expect(onSwitchOffClicked).toHaveBeenCalled();
    });
});