import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {AddThingModal} from "./AddThingModal";
import '@testing-library/jest-dom';
import {Device, ThingType} from "./Thing";
import {Builder} from "builder-pattern";

describe('AddThingModal', () => {
    let handleClose: jest.Mock;
    let onAddThing: jest.Mock;

    beforeEach(() => {
        handleClose = jest.fn();
        onAddThing = jest.fn();
    });

    const typeInputOnTextField = (text: string) => {
        fireEvent.change(screen.getByTestId('thing-name-form')
            .querySelector('input')!, {target: {value: text}});
    }

    const selectThingType = async () => {
        fireEvent.mouseDown(screen.getByTestId('thing-type-selector'));

        await waitFor(() => {
            expect(screen.getByTestId('type-selector-ALARM')).toBeVisible();
            fireEvent.click(screen.getByText('ALARM'));
        })
    }

    const selectDeviceId = async () => {
        fireEvent.click(within(await screen.findByTestId("device-name-selector")).getByRole("combobox"));

        await waitFor(() => {
            expect(screen.getByRole("option", { name: "device 2" })).toBeInTheDocument();
        });
    }

    //TODO test the device selector if possible

    it('should create a new device if no one is selected', () => {
        render(<AddThingModal devices={[
                Builder<Device>().deviceId('123').deviceName('device 1').build(),
                Builder<Device>().deviceId('456').deviceName('device 2').build(),
            ]} handleClose={handleClose} onAddThing={onAddThing}/>
        );

        expect(screen.getByTestId('add-thing-content')).toBeVisible();
        expect(screen.getByTestId('device-name-selector')).toBeVisible();
        expect(screen.getByTestId('thing-type-selector')).toBeVisible();
        expect(screen.getByTestId('thing-name-form')).toBeVisible();

        selectThingType();

        typeInputOnTextField('new thing name');

        fireEvent.click(screen.getByTestId('confirm-button'));

        expect(onAddThing).toHaveBeenCalledWith(null, ThingType.LAMP, 'new thing name');
    })

    it('should call the onClose callback when clicking on X button', () => {
        render(<AddThingModal devices={[
                Builder<Device>().deviceId('123').deviceName('device 1').build(),
                Builder<Device>().deviceId('456').deviceName('device 2').build(),
            ]} handleClose={handleClose} onAddThing={onAddThing}/>
        );

        fireEvent.click(screen.getByTestId('add-thing-close-button'));

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
})