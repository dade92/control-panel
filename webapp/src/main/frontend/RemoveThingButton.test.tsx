import {fireEvent, render, screen} from "@testing-library/react";
import {RemoveThingButton} from "./RemoveThingButton";
import {Builder} from "builder-pattern";
import {Thing} from "./Thing";

describe('RemoveThingButton', () => {

    const thing = Builder<Thing>().id('123').build();

    it('calls the callback when clicked', () => {
        const onRemoved = jest.fn();

        render(<RemoveThingButton thing={thing} onRemoved={onRemoved} loading={false}/>);

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        expect(onRemoved).toHaveBeenCalled();
    })

    it('is disabled while loading', () => {
        const onRemoved = jest.fn();

        render(<RemoveThingButton thing={thing} onRemoved={onRemoved} loading={true}/>);

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        expect(onRemoved).not.toHaveBeenCalled();
    })
})