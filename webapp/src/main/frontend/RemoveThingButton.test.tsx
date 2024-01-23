import {fireEvent, render, screen} from "@testing-library/react";
import {RemoveThingButton} from "./RemoveThingButton";
import {Builder} from "builder-pattern";
import {Thing} from "./Thing";

describe('RemoveThingButton', () => {
    it('calls the callback when clicked', () => {
        const onRemoved = jest.fn();

        render(<RemoveThingButton thing={Builder<Thing>().id('123').build()} onRemoved={onRemoved}/>);

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        expect(onRemoved).toHaveBeenCalled();
    })
})