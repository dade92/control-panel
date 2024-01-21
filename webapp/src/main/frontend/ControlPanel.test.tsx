import {render, screen, waitFor} from "@testing-library/react";
import {ControlPanel} from "./ControlPanel";
import {Builder} from "builder-pattern";
import {Thing, ThingType} from "./Thing";
import '@testing-library/jest-dom';

describe('ControlPanel', () => {
    it('Renders the loader while loading, then the things panel', async () => {
        const thing = Builder<Thing>().id('123').type(ThingType.LAMP).status({switch: "OFF"}).build();
        const retrieveThingsProvider = jest.fn(
            () => Promise.resolve({things: [thing, thing]})
        );

        render(<ControlPanel retrieveThingsProvider={retrieveThingsProvider}/>);

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
        })
    })
});