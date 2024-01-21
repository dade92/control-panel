import {render, screen, waitFor} from "@testing-library/react";
import {ThingsPanel} from "./ThingsPanel";
import '@testing-library/jest-dom';
import {Builder} from "builder-pattern";
import {Thing, ThingType} from "./Thing";

describe('ThingsPanel', () => {
    it('Shows the list of things correctly', async () => {
        const onChangeStatus = jest.fn();

        render(<ThingsPanel
            things={[
                Builder<Thing>().id('123').type(ThingType.LAMP).status({switch: "ON"}).build(),
                Builder<Thing>().id('456').type(ThingType.LAMP).status({switch: "OFF"}).build()
            ]}
            onChangeStatus={onChangeStatus}/>
        )

        await waitFor(() => {
            expect(screen.getByTestId('things-panel-wrapper')).toBeVisible();
            expect(screen.getByTestId('thing-wrapper-123')).toBeVisible();
            expect(screen.getByTestId('thing-wrapper-456')).toBeVisible();
        })
    })
});