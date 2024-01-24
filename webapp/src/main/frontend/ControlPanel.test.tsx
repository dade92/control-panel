import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ControlPanel} from "./ControlPanel";
import {Builder} from "builder-pattern";
import {Thing, ThingStatus, ThingType} from "./Thing";
import '@testing-library/jest-dom';

describe('ControlPanel', () => {
    const thing = Builder<Thing>()
        .id('123')
        .name('a thing')
        .type(ThingType.LAMP)
        .management({switch: ThingStatus.OFF})
        .build();
    const anotherThing = Builder<Thing>()
        .id('456')
        .name('another thing')
        .type(ThingType.LAMP)
        .management({switch: ThingStatus.OFF})
        .build();

    it('Renders the loader while loading, then the things panel', async () => {
        const retrieveThingsProvider = jest.fn(
            () => Promise.resolve({things: [thing, thing]})
        );

        render(<ControlPanel retrieveThingsProvider={retrieveThingsProvider} removeThingsProvider={jest.fn()}/>);

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        })
    });

    it('should switch a lamp on', async () => {
        const retrieveThingsProvider = jest.fn(
            () => Promise.resolve({things: [thing, anotherThing]})
        );
        const removeThingsProvider = jest.fn();

        render(
            <ControlPanel
                retrieveThingsProvider={retrieveThingsProvider}
                removeThingsProvider={removeThingsProvider}
            />
        );

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        });

    })

    describe('Remove thing', () => {
        it('removes correctly one item when click on remove button', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing, anotherThing]})
            );
            const removeThingsProvider = jest.fn(() => Promise.resolve());
            const thing = Builder<Thing>()
                .id('123')
                .name('a thing')
                .type(ThingType.LAMP)
                .management({switch: ThingStatus.OFF})
                .build();

            const anotherThing = Builder<Thing>()
                .id('456')
                .name('another thing')
                .type(ThingType.LAMP)
                .management({switch: ThingStatus.OFF})
                .build();

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('cancel-button-123'));

            await waitFor(() => {
                expect(screen.getByTestId('confirm-modal')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('confirm-button'));

            await waitFor(() => {
                expect(removeThingsProvider).toHaveBeenCalledWith('123');
                expect(screen.queryByTestId('thing-wrapper-123')).toBeNull();
            });
        })

        it('should not remove if the user does not confirm the removal', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing, anotherThing]})
            );
            const removeThingsProvider = jest.fn(() => Promise.resolve());
            const thing = Builder<Thing>()
                .id('123')
                .name('a thing')
                .type(ThingType.LAMP)
                .management({switch: ThingStatus.OFF})
                .build();

            const anotherThing = Builder<Thing>()
                .id('456')
                .name('another thing')
                .type(ThingType.LAMP)
                .management({switch: ThingStatus.OFF})
                .build();

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('cancel-button-123'));

            await waitFor(() => {
                expect(screen.getByTestId('confirm-modal')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('no-button'));

            await waitFor(() => {
                expect(removeThingsProvider).not.toHaveBeenCalled();
                expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();
            });
        })
    });
});