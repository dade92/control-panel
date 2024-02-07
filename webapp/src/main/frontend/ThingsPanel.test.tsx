import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ThingsPanel} from "./ThingsPanel";
import '@testing-library/jest-dom';
import {Builder} from "builder-pattern";
import {Thing, ThingStatus, ThingType} from "./Thing";

describe('ThingsPanel', () => {
    let onThingRemoved: jest.Mock;
    let onChangeStatus: jest.Mock;

    let thing: Thing;
    let anotherThing: Thing;

    beforeEach(() => {
        onThingRemoved = jest.fn();
        onChangeStatus = jest.fn();

        thing = Builder<Thing>()
            .id('123')
            .name('lamp 1')
            .type(ThingType.LAMP)
            .management({switch: ThingStatus.ON})
            .build();
        anotherThing = Builder<Thing>()
            .id('456')
            .name('lamp 2')
            .type(ThingType.LAMP)
            .management({switch: ThingStatus.OFF})
            .build();
    });

    it('Shows subtitle, add thing button and list of things correctly', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
                idWaitingToBeRemoved={''}
                switchStatusProvider={jest.fn()}
                addThingProvider={jest.fn()}
                onThingAdded={jest.fn()}
            />
        );

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();
            expect(screen.getByTestId('thing-wrapper-456')).toBeVisible();
            expect(screen.getByTestId('add-thing-button')).toBeVisible();
            expect(screen.getByTestId('panel-subtitle')).toBeVisible();
        })
    })

    it('clicking on cancel button opens the modal, when choice is confirmed, callback is called', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
                idWaitingToBeRemoved={''}
                switchStatusProvider={jest.fn()}
                addThingProvider={jest.fn()}
                onThingAdded={jest.fn()}
            />
        );

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        await waitFor(() => {
            expect(screen.getByTestId('confirm-modal')).toBeVisible();
        });

        fireEvent.click(screen.getByTestId('confirm-button'));

        expect(onThingRemoved).toHaveBeenCalledTimes(1);
        expect(onThingRemoved).toHaveBeenCalledWith(thing);
    })

    it('refusing the modal, do not call the callback', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
                idWaitingToBeRemoved={''}
                switchStatusProvider={jest.fn()}
                addThingProvider={jest.fn()}
                onThingAdded={jest.fn()}
            />
        );

        fireEvent.click(screen.getByTestId('cancel-button-123'));

        await waitFor(() => {
            expect(screen.getByTestId('confirm-modal')).toBeVisible();
        });

        fireEvent.click(screen.getByTestId('no-button'));

        expect(onThingRemoved).not.toHaveBeenCalled();
    })

    it('should show add thing modal on clicking on add thing', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
                idWaitingToBeRemoved={''}
                switchStatusProvider={jest.fn()}
                addThingProvider={jest.fn()}
                onThingAdded={jest.fn()}
            />
        );

        fireEvent.click(screen.getByTestId('add-thing-button'));

        await waitFor(() => {
            expect(screen.getByTestId('add-thing-modal')).toBeVisible();
        });

        fireEvent.click(screen.getByTestId('add-thing-close-button'));

        await waitFor(() => {
            expect(screen.queryByTestId('add-thing-modal')).toBeNull();
        });
    });
});