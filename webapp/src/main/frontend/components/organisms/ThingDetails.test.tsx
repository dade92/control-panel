import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ThingDetails} from "./ThingDetails";
import {Builder} from "builder-pattern";
import {Management, Thing, ThingStatus, ThingType} from "../../logic/Types";
import '@testing-library/jest-dom';

describe('ThingDetails', () => {
    let changeStatusCallback: jest.Mock;
    let switchStatusProvider: jest.Mock = jest.fn(
        () => Promise.resolve()
    );
    let onThingRemoved: jest.Mock = jest.fn();
    let onInfoThingClicked: jest.Mock = jest.fn();
    let statusOFF: Management;
    let thing: Thing;
    let statusON: Management;

    beforeEach(() => {
        changeStatusCallback = jest.fn();
        switchStatusProvider = jest.fn(
            () => Promise.resolve()
        );
        onThingRemoved = jest.fn();
        onInfoThingClicked = jest.fn();

        statusOFF = Builder<Management>().switch(ThingStatus.OFF).build();
        thing = Builder<Thing>().id('123').type(ThingType.LAMP).management(statusOFF).build();
        statusON = Builder<Management>().switch(ThingStatus.ON).build();
    });

    it('switch thing on successful, calls a callback afterwards', async () => {
        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
                shouldBeLoading={false}
                onInfoClicked={jest.fn()}
                forceOff={false}
            />
        );

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByRole('checkbox'));

        await waitFor(() => {
            expect(screen.getByRole('checkbox')).toBeChecked();
            expect(switchStatusProvider).toHaveBeenCalledWith(thing, statusON)
            expect(changeStatusCallback).toHaveBeenCalledTimes(1);
            expect(changeStatusCallback).toHaveBeenCalledWith(true, thing);
        });
    })

    it('switch thing on NOT successful, calls a callback afterwards', async () => {
        const failSwitchStatusProvider = jest.fn(
            () => Promise.reject()
        );
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).management(statusON).build();

        render(<ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={failSwitchStatusProvider}
                onThingRemoved={onThingRemoved}
                shouldBeLoading={false}
                onInfoClicked={jest.fn()}
                forceOff={false}
            />
        )

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByRole('checkbox'));

        await waitFor(() => {
            expect(failSwitchStatusProvider).toHaveBeenCalledWith(thing, statusOFF);
            expect(changeStatusCallback).toHaveBeenCalledTimes(1);
            expect(changeStatusCallback).toHaveBeenCalledWith(false, thing);
            // expect(screen.getByRole('checkbox')).not.toBeChecked();
        });
    })

    it('call remove callback when clicking on the remove button', async () => {
        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
                shouldBeLoading={false}
                onInfoClicked={jest.fn()}
                forceOff={false}
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

    it('calls the info callback when clicking on the info button', async () => {
        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
                shouldBeLoading={false}
                onInfoClicked={onInfoThingClicked}
                forceOff={false}
            />
        )

        expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();

        fireEvent.click(screen.getByTestId('info-button-123'));

        await waitFor(() => {
            expect(switchStatusProvider).not.toHaveBeenCalled();
            expect(changeStatusCallback).not.toHaveBeenCalled();
            expect(onThingRemoved).not.toHaveBeenCalled();
            expect(onInfoThingClicked).toHaveBeenCalledWith(thing);
        });
    })

    it('uncheck the switch when forceOffAndDisabled is true', async () => {
        render(
            <ThingDetails
                thing={thing}
                onChangeStatus={changeStatusCallback}
                switchStatusProvider={switchStatusProvider}
                onThingRemoved={onThingRemoved}
                shouldBeLoading={false}
                onInfoClicked={onInfoThingClicked}
                forceOff={true}
            />
        )

        await waitFor(() => {
            expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();
            expect(screen.getByRole('checkbox')).not.toBeChecked()
        });
    })
});