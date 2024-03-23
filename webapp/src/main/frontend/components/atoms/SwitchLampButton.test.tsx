import {SwitchLampButton} from "./SwitchLampButton";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom';

describe('SwitchLampButton', () => {
    it('should render correctly', async () => {
        const onChange = jest.fn();

        render(
            <SwitchLampButton isOn={true} disabled={true} onChange={onChange}/>
        );
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        // expect(screen.getByRole('checkbox')).toBeDisabled();

        fireEvent.click(screen.getByRole('checkbox'));

        expect(onChange).toHaveBeenCalled();
    });
});