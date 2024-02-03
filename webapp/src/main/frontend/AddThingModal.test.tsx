import {fireEvent, getByRole, render, screen, waitFor, within} from "@testing-library/react";
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

    const typeInputOnTextField = () => {
        fireEvent.change(screen.getByTestId('thing-name-form')
            .querySelector('input')!, {target: {value: 'new thing name'}});
    }

    const selectThingType = () => {
        fireEvent.mouseDown(screen.getByTestId('thing-type-selector'));
        fireEvent.click(screen.getByText('LAMP'));
    }

    const selectDeviceId = () => {
        fireEvent.click(screen.getByTestId("device-name-selector"));
        fireEvent.click(screen.getByTestId('selector-123'));
    }

    it('should render form correctly and call the add thing with the correct params', async () => {
        render(<AddThingModal devices={[
                Builder<Device>().deviceId('123').deviceName('device 1').build(),
                Builder<Device>().deviceId('456').deviceName('device 2').build(),
            ]} handleClose={handleClose} onAddThing={onAddThing}/>
        );

        expect(screen.getByTestId('add-thing-content')).toBeVisible();
        expect(screen.getByTestId('device-name-selector')).toBeVisible();
        expect(screen.getByTestId('thing-type-selector')).toBeVisible();
        expect(screen.getByTestId('thing-name-form')).toBeVisible();

        selectDeviceId();

        selectThingType();

        typeInputOnTextField();

        fireEvent.click(screen.getByTestId('confirm-button'));

        expect(onAddThing).toHaveBeenCalledWith('456', ThingType.LAMP, 'new thing name');
    });

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