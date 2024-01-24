import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ThingsPanel} from "./ThingsPanel";
import '@testing-library/jest-dom';
import {Builder} from "builder-pattern";
import {Thing, ThingStatus, ThingType} from "./Thing";

describe('ThingsPanel', () => {
    const onThingRemoved = jest.fn();
    const onChangeStatus = jest.fn();
    const thing = Builder<Thing>()
        .id('123')
        .name('lamp 1')
        .type(ThingType.LAMP)
        .management({switch: ThingStatus.ON})
        .build();
    const anotherThing = Builder<Thing>()
        .id('456')
        .name('lamp 2')
        .type(ThingType.LAMP)
        .management({switch: ThingStatus.OFF})
        .build();

    it('Shows subtitle, add thing button and list of things correctly', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
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

    it('clicking on cancel button opens the modal', async () => {
        render(
            <ThingsPanel
                things={[
                    thing,
                    anotherThing
                ]}
                onChangeStatus={onChangeStatus}
                onThingRemoved={onThingRemoved}
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
});