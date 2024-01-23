import {render, screen, waitFor} from "@testing-library/react";
import {ControlPanel} from "./ControlPanel";
import {Builder} from "builder-pattern";
import {ThingStatus, Thing, ThingType} from "./Thing";
import '@testing-library/jest-dom';

describe('ControlPanel', () => {
    it('Renders the loader while loading, then the things panel', async () => {
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).management({switch: ThingStatus.OFF}).build();
        const retrieveThingsProvider = jest.fn(
            () => Promise.resolve({things: [thing, thing]})
        );

        render(<ControlPanel retrieveThingsProvider={retrieveThingsProvider} removeThingsProvider={jest.fn()}/>);

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        })
    });

    //TODO test the remove thing part
});