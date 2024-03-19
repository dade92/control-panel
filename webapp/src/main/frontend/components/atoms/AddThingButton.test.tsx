import {AddThingButton} from "./AddThingButton";
import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';

describe('AddThingButton', () => {
    it('should render', () => {
        const onAddThingClicked = jest.fn();

        render(<AddThingButton onAddThingClicked={onAddThingClicked}/>);

        expect(screen.getByTestId('add-thing-button')).toBeInTheDocument();

        screen.getByTestId('add-thing-button').click();

        expect(onAddThingClicked).toHaveBeenCalled();
    })
})