import {fireEvent, render, screen} from "@testing-library/react";
import {AddThingModal} from "./AddThingModal";
import '@testing-library/jest-dom';
import {Device} from "./Thing";
import {Builder} from "builder-pattern";

describe('AddThingModal', () => {

    let handleClose: jest.Mock;
    let onAddThing: jest.Mock;

    beforeEach(() => {
        handleClose = jest.fn();
        onAddThing = jest.fn();
    });

    it('should render form correctly', () => {
        render(<AddThingModal devices={[
                Builder<Device>().deviceId('123').deviceName('device 1').build(),
                Builder<Device>().deviceId('456').deviceName('device 2').build(),
            ]} handleClose={handleClose} onAddThing={onAddThing}/>
        );

        expect(screen.getByTestId('add-thing-content')).toBeVisible();
        expect(screen.getByTestId('device-id-selector')).toBeVisible();
        expect(screen.getByTestId('thing-type-selector')).toBeVisible();
        expect(screen.getByTestId('thing-name-form')).toBeVisible();

        //TODO check the call on onAddThing with the params inserted by the user
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