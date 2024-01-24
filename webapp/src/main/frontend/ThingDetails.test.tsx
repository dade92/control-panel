import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ThingDetails} from "./ThingDetails";
import {Builder} from "builder-pattern";
import {Management, Thing, ThingStatus, ThingType} from "./Thing";
import '@testing-library/jest-dom';

describe('ThingDetails', () => {
    let changeStatusCallback: jest.Mock;
    let switchStatusProvider: jest.Mock = jest.fn(
        () => Promise.resolve()
    );
    let onThingRemoved: jest.Mock = jest.fn();

    beforeEach(() => {
        changeStatusCallback = jest.fn();
        switchStatusProvider = jest.fn(
            () => Promise.resolve()
        );
        onThingRemoved = jest.fn();
    })

    it('call change status callback when switch is successful', async () => {
        const statusOFF = Builder<Management>().switch(ThingStatus.OFF).build();
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).management(statusOFF).build();
        const statusON = Builder<Management>().switch(ThingStatus.ON).build();

        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
            />
        );

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByRole('checkbox'));

        await waitFor(() => {
            expect(switchStatusProvider).toHaveBeenCalledWith(thing, statusON)
            expect(changeStatusCallback).toHaveBeenCalledTimes(1);
            expect(changeStatusCallback).toHaveBeenCalledWith(true, thing);
        });
    })

    it('call change status callback when switch gives an error', async () => {
        const failSwitchStatusProvider = jest.fn(
            () => Promise.reject()
        );
        const statusOFF = Builder<Management>().switch(ThingStatus.OFF).build();
        const statusON = Builder<Management>().switch(ThingStatus.ON).build();
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).management(statusON).build();

        render(<ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={failSwitchStatusProvider}
                onThingRemoved={onThingRemoved}
            />
        )

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByRole('checkbox'));

        await waitFor(() => {
            expect(failSwitchStatusProvider).toHaveBeenCalledWith(thing, statusOFF);
            expect(changeStatusCallback).toHaveBeenCalledTimes(1);
            expect(changeStatusCallback).toHaveBeenCalledWith(false, thing);
        });
    })

    it('call remove callback when clicking on the remove button', async () => {
        const statusOFF = Builder<Management>().switch(ThingStatus.OFF).build();
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).management(statusOFF).build();

        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
            />
        )

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        await waitFor(() => {
            expect(switchStatusProvider).not.toHaveBeenCalled();
            expect(changeStatusCallback).not.toHaveBeenCalled();
            expect(onThingRemoved).toHaveBeenCalledWith(thing);
        });

    })
});