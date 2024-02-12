import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {ThingsPanel} from "./ThingsPanel";
import '@testing-library/jest-dom';
import {Builder} from "builder-pattern";
import {Thing, ThingStatus, ThingType} from "./Thing";

describe('ThingsPanel', () => {
    let onThingRemoved: jest.Mock;
    let onChangeStatus: jest.Mock;
    let addThingProvider: jest.Mock;
    let onHostChanged: jest.Mock;
    let onThingAdded: jest.Mock;
    let changeHostProvider: jest.Mock;

    let thing: Thing;
    let anotherThing: Thing;

    beforeEach(() => {
        onThingRemoved = jest.fn();
        onChangeStatus = jest.fn();
        onHostChanged = jest.fn();
        addThingProvider = jest.fn();
        onThingAdded = jest.fn();
        changeHostProvider = jest.fn();

        thing = Builder<Thing>()
            .id('123')
            .name('lamp 1')
            .deviceId('XXX')
            .type(ThingType.LAMP)
            .management({switch: ThingStatus.ON})
            .build();
        anotherThing = Builder<Thing>()
            .id('456')
            .name('lamp 2')
            .type(ThingType.LAMP)
            .deviceId('YYY')
            .management({switch: ThingStatus.OFF})
            .build();
    });

    const typeInputOnTextField = (text: string) => {
        fireEvent.change(screen.getByTestId('thing-name-form')
            .querySelector('input')!, {target: {value: text}});
    }

    describe('Things display', () => {
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
                    onHostChanged={jest.fn()}
                    changeHostProvider={changeHostProvider}
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

        it('should show no thing text if array is empty', () => {
            render(
                <ThingsPanel things={[]}
                             onChangeStatus={onChangeStatus}
                             onThingRemoved={onThingRemoved}
                             idWaitingToBeRemoved={''}
                             switchStatusProvider={jest.fn()}
                             addThingProvider={jest.fn()}
                             onThingAdded={jest.fn()}
                             onHostChanged={jest.fn()}
                             changeHostProvider={jest.fn()}
                />
            );

            expect(screen.getByTestId('no-thing-text')).toBeVisible();
        });
    })

    describe('Cancel action', () => {
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
                    onHostChanged={jest.fn()}
                    changeHostProvider={changeHostProvider}
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

        it('closing the modal, do not call the callback', async () => {
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
                    onHostChanged={jest.fn()}
                    changeHostProvider={changeHostProvider}
                />
            );

            fireEvent.click(screen.getByTestId('cancel-button-123'));

            await waitFor(() => {
                expect(screen.getByTestId('confirm-modal')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('no-button'));

            expect(onThingRemoved).not.toHaveBeenCalled();
        })
    })

    describe('Add thing action', () => {
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
                    addThingProvider={addThingProvider}
                    onThingAdded={onThingAdded}
                    onHostChanged={jest.fn()}
                    changeHostProvider={changeHostProvider}
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

        it('should call the add thing provider and in case of success call the callback', async () => {
            const newThing = Builder<Thing>().name('new thing').build();
            addThingProvider = jest.fn(() => Promise.resolve({thing: newThing}));

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
                    addThingProvider={addThingProvider}
                    onThingAdded={onThingAdded}
                    onHostChanged={jest.fn()}
                    changeHostProvider={changeHostProvider}
                />
            );

            fireEvent.click(screen.getByTestId('add-thing-button'));

            await waitFor(() => {
                expect(screen.getByTestId('add-thing-modal')).toBeVisible();
            });

            typeInputOnTextField('new name');

            fireEvent.click(screen.getByTestId('confirm-button'));

            expect(addThingProvider).toHaveBeenCalledWith(null, ThingType.LAMP, 'new name');

            await waitFor(() => {
                expect(onThingAdded).toHaveBeenCalledWith(newThing);
                expect(screen.queryByTestId('add-thing-modal')).toBeNull();
            });
        })
    })

    describe('Info action', () => {
        it('should show info modal when info button clicked', async () => {
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
                    onHostChanged={onHostChanged}
                    changeHostProvider={changeHostProvider}
                />
            );

            fireEvent.click(screen.getByTestId('info-button-123'));

            await waitFor(() => {
                expect(screen.getByTestId('info-modal')).toBeVisible();
                expect(screen.getByTestId('info-thing-name')).toBeVisible();
                expect(screen.getByTestId('info-thing-device')).toBeVisible();
                expect(screen.getByTestId('info-thing-type')).toBeVisible();
            });

            fireEvent.click(screen.getByTestId('info-thing-close-button'));

            await waitFor(() => {
                expect(screen.queryByTestId('info-modal')).toBeNull();
            });
        })

        it('on change host, should close the modal and call the callback', async () => {
            changeHostProvider = jest.fn(() => Promise.resolve());

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
                    onHostChanged={onHostChanged}
                    changeHostProvider={changeHostProvider}
                />
            );

            fireEvent.click(screen.getByTestId('info-button-123'));

            await waitFor(() => {
                expect(screen.getByTestId('info-modal')).toBeVisible();
            });

            fireEvent.change(screen.getByTestId('info-thing-device-host')
                .querySelector('input')!, {target: {value: 'new host'}});

            fireEvent.click(screen.getByTestId('host-change-button'));

            await waitFor(() => {
                expect(changeHostProvider).toHaveBeenCalledWith('XXX' ,'new host')
                expect(screen.queryByTestId('info-modal')).toBeNull();
                expect(onHostChanged).toHaveBeenCalledWith('new host', 'XXX');
            });
        })
    })
});