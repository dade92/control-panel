import {render, screen} from "@testing-library/react";
import {InfoThingModal} from "./InfoThingModal";
import {Thing} from "./Thing";
import {Builder} from "builder-pattern";
import '@testing-library/jest-dom';

describe('InfoThingModal', () => {

    it('Should show correct information', () => {
        const handleClose = jest.fn();

        render(<InfoThingModal thing={Builder<Thing>().name('TEST NAME').device('DEVICE NAME').build()}
                               handleClose={handleClose}/>)

        expect(screen.getByTestId('info-modal')).toBeVisible();
        expect(screen.getByTestId('info-thing-name')).toHaveTextContent('TEST NAME');
        expect(screen.getByTestId('info-thing-device')).toHaveTextContent('DEVICE NAME');
    })

})