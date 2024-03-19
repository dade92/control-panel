import {fireEvent, render, screen} from "@testing-library/react";
import {RemoveThingConfirmModal} from "./RemoveThingConfirmModal";
import {Thing} from "../../logic/Types";
import {Builder} from "builder-pattern";
import '@testing-library/jest-dom';

describe('RemoveThingConfirmModal', () => {

    it('should display correct info and calls the callbacks', () => {
        const onConfirm = jest.fn();
        const onCancel = jest.fn();
        const thingName = 'test thing';

        render(<RemoveThingConfirmModal thing={Builder<Thing>().name(thingName).build()} onConfirm={onConfirm}
                                        onCancel={onCancel}/>);

        expect(screen.getByTestId('remove-modal-title')).toBeVisible();
        expect(screen.getByTestId('remove-modal-title')).toHaveTextContent('removing test thing');

        fireEvent.click(screen.getByTestId('confirm-button'));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    })

})