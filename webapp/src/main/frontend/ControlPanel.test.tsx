import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ControlPanel} from "./ControlPanel";
import {Builder} from "builder-pattern";
import {Thing, ThingStatus, ThingType} from "./Thing";
import '@testing-library/jest-dom';

describe('ControlPanel', () => {

    let thing: Thing;
    let anotherThing: Thing

    beforeEach(() => {
        thing = Builder<Thing>()
            .id('123')
            .name('a thing')
            .type(ThingType.LAMP)
            .deviceId('789')
            .management({switch: ThingStatus.OFF})
            .build();
        anotherThing = Builder<Thing>()
            .id('456')
            .name('another thing')
            .type(ThingType.LAMP)
            .deviceId('789')
            .management({switch: ThingStatus.OFF})
            .build();
    })

    it('Renders the loader while loading, then the things panel', async () => {
        const retrieveThingsProvider = jest.fn(
            () => Promise.resolve({things: [thing, anotherThing]})
        );

        render(
            <ControlPanel
                retrieveThingsProvider={retrieveThingsProvider}
                removeThingsProvider={jest.fn()}
                switchStatusProvider={jest.fn()}
                addThingProvider={jest.fn()}
            />);

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        })
    });

    describe('switch thing', () => {
        it('should switch a thing ON when switch provider is successfull', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing]})
            );
            const removeThingsProvider = jest.fn();
            const switchStatusProvider = jest.fn(
                () => Promise.resolve()
            );

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                    switchStatusProvider={switchStatusProvider}
                    addThingProvider={jest.fn()}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByRole('checkbox'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-success')).toBeVisible();
            })

        })

        it('should display an error message if switch provider is NOT successfull', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing]})
            );
            const removeThingsProvider = jest.fn();
            const switchStatusProvider = jest.fn(
                () => Promise.reject()
            );

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                    switchStatusProvider={switchStatusProvider}
                    addThingProvider={jest.fn()}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByRole('checkbox'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-error')).toBeVisible();
            })

        })
    })

    describe('Remove thing', () => {
        it('removes correctly one item when click on remove button', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing, anotherThing]})
            );
            const removeThingsProvider = jest.fn(() => Promise.resolve());
            const switchStatusProvider = jest.fn();

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                    switchStatusProvider={switchStatusProvider}
                    addThingProvider={jest.fn()}
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
                expect(removeThingsProvider).toHaveBeenCalledWith('789', '123');
                expect(screen.queryByTestId('thing-wrapper-123')).toBeNull();
            });
        })

        it('should not remove if the user does not confirm the removal', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing, anotherThing]})
            );
            const removeThingsProvider = jest.fn(() => Promise.resolve());
            const switchStatusProvider = jest.fn();

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                    switchStatusProvider={switchStatusProvider}
                    addThingProvider={jest.fn()}
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

    describe('Add thing', () => {
        it('successfully adds a new thing', () => {

        })

        it('add thing fails', () => {

        })
    })
});