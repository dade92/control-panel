import {fireEvent, render, screen} from "@testing-library/react";
import {InfoThingModal} from "./InfoThingModal";
import {Thing} from "./Thing";
import {Builder} from "builder-pattern";
import '@testing-library/jest-dom';

describe('InfoThingModal', () => {

    let handleClose: jest.Mock
    let onChangeHost: jest.Mock

    beforeEach(() => {
        handleClose = jest.fn();
        onChangeHost = jest.fn();
    });

    it('Should show correct information', () => {
        render(<InfoThingModal
            thing={Builder<Thing>().name('TEST NAME').device('DEVICE NAME').deviceHost('host').build()}
            handleClose={handleClose} onChangeHost={onChangeHost}/>)

        expect(screen.getByTestId('info-modal')).toBeVisible();
        expect(screen.getByTestId('info-thing-name')).toHaveTextContent('TEST NAME');
        expect(screen.getByTestId('info-thing-device')).toHaveTextContent('DEVICE NAME');
        expect(screen.getByTestId('info-thing-device-host')).toBeVisible();
    })

    it('should call the on change callback with the correct host', () => {
        render(<InfoThingModal
            thing={Builder<Thing>().name('TEST NAME').deviceId('device id').device('DEVICE NAME').deviceHost('host').build()}
            handleClose={handleClose} onChangeHost={onChangeHost}/>)

        fireEvent.change(screen.getByTestId('info-thing-device-host')
            .querySelector('input')!, {target: {value: 'new host'}});

        fireEvent.click(screen.getByTestId('host-change-button'))

        expect(onChangeHost).toHaveBeenCalledWith('new host', 'device id')
    })

})