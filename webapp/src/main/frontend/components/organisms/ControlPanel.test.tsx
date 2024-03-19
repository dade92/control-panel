import {fireEvent, render, screen, waitFor, within} from "@testing-library/react";
import {ControlPanel} from "./ControlPanel";
import {Builder} from "builder-pattern";
import {Management, Thing, ThingStatus, ThingType} from "../../logic/Types";
import '@testing-library/jest-dom';

describe('ControlPanel', () => {

    let thing: Thing;
    let anotherThing: Thing
    let thingOn: Thing;
    let thingOnAlarm: Thing;

    beforeEach(() => {
        thing = Builder<Thing>()
            .id('123')
            .name('a thing')
            .device('device 1')
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
        thingOn = Builder<Thing>()
            .id('789')
            .name('switched on thing')
            .type(ThingType.LAMP)
            .deviceId('789')
            .management({switch: ThingStatus.ON})
            .build();
        thingOnAlarm = Builder<Thing>()
            .id('789')
            .name('switched on thing')
            .type(ThingType.ALARM)
            .deviceId('789')
            .management({switch: ThingStatus.ON})
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
                switchAllOffProvider={jest.fn()}
            />);

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        })
    });

    describe('switch thing', () => {
        it('should switch a thing ON when switch provider is successful', async () => {
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
                    switchAllOffProvider={jest.fn()}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByRole('checkbox'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-success')).toBeVisible();
                expect(screen.getByRole('checkbox')).toBeChecked();
            })

        })

        it('should display an error message if switch provider is NOT successful', async () => {
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
                    switchAllOffProvider={jest.fn()}
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

        it('should switch all things off, with feedback', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing]})
            );

            const switchStatusProvider = jest.fn(
                () => Promise.resolve()
            );

            const switchAllOffProvider = jest.fn(
                () => Promise.resolve()
            );

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={jest.fn()}
                    switchStatusProvider={switchStatusProvider}
                    addThingProvider={jest.fn()}
                    switchAllOffProvider={switchAllOffProvider}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByRole('checkbox'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-success')).toBeVisible();
                expect(screen.getByRole('checkbox')).toBeChecked();
            })

            fireEvent.click(screen.getByTestId('switch-off-button'));

            await waitFor(() => {
                expect(switchAllOffProvider).toHaveBeenCalledWith([thing]);
                expect(screen.getByTestId('feedback-wrapper-success')).toBeVisible();
                expect(screen.getByRole('checkbox')).not.toBeChecked();
            })
        })
    })

    describe('Remove thing', () => {
        it('removes correctly one item when click on remove button', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing, anotherThing]})
            );
            const removeThingsProvider = jest.fn(() => Promise.resolve());

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={removeThingsProvider}
                    switchStatusProvider={jest.fn()}
                    addThingProvider={jest.fn()}
                    switchAllOffProvider={jest.fn()}
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
                    switchAllOffProvider={jest.fn()}
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

        const typeInputOnTextField = (text: string) => {
            fireEvent.change(screen.getByTestId('thing-name-form')
                .querySelector('input')!, {target: {value: text}});
        }

        //TODO fix these functions

        const selectThingType = async () => {
            fireEvent.click(screen.getByTestId('thing-type-selector'));

            await waitFor(() => {
                expect(screen.getByTestId('type-selector-ALARM')).toBeVisible();
                fireEvent.click(screen.getByText('ALARM'));
            })
        }

        const selectDeviceId = async () => {
            fireEvent.click(within(await screen.findByTestId("device-name-selector")).getByRole("combobox"));

            await waitFor(() => {
                expect(screen.getByRole("option", {name: "device 1"})).toBeInTheDocument();
            });
        }

        it('successfully adds a new thing', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing]})
            );

            const addThingProvider = jest.fn(
                () => Promise.resolve({
                        thing: Builder<Thing>().id('NEW-THING').management(
                            Builder<Management>().switch(ThingStatus.OFF).build()
                        ).build()
                    }
                )
            );

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={jest.fn()}
                    switchStatusProvider={jest.fn()}
                    addThingProvider={addThingProvider}
                    switchAllOffProvider={jest.fn()}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('add-thing-button'));

            await waitFor(() => {
                expect(screen.getByTestId('add-thing-modal')).toBeVisible();
            });

            // await selectDeviceId();
            // await selectThingType();
            typeInputOnTextField('thing name');

            fireEvent.click(screen.getByTestId('confirm-button'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-success')).toBeVisible();
                expect(screen.getByTestId('thing-wrapper-NEW-THING')).toBeVisible();
                expect(screen.queryByTestId('add-thing-modal')).toBeNull();
            });
        })

        it('add thing fails', async () => {
            const retrieveThingsProvider = jest.fn(
                () => Promise.resolve({things: [thing]})
            );

            const addThingProvider = jest.fn(
                () => Promise.reject()
            );

            render(
                <ControlPanel
                    retrieveThingsProvider={retrieveThingsProvider}
                    removeThingsProvider={jest.fn()}
                    switchStatusProvider={jest.fn()}
                    addThingProvider={addThingProvider}
                    switchAllOffProvider={jest.fn()}
                />
            );

            await waitFor(() => {
                expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('add-thing-button'));

            await waitFor(() => {
                expect(screen.getByTestId('add-thing-modal')).toBeVisible();
            });

            // await selectDeviceId();
            // await selectThingType();
            await typeInputOnTextField('thing name');

            fireEvent.click(screen.getByTestId('confirm-button'));

            await waitFor(() => {
                expect(screen.getByTestId('feedback-wrapper-error')).toBeVisible();
                expect(screen.queryByTestId('thing-wrapper-NEW-THING')).toBeNull();
                expect(screen.queryByTestId('add-thing-modal')).toBeNull();
            });
        })
    })
});