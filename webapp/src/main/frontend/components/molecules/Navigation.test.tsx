import {fireEvent, render, screen} from "@testing-library/react";
import {Navigation} from "./Navigation";
import '@testing-library/jest-dom';

describe('Navigation', () => {
    it('should render correctly and call the callback when clicked', () => {
        const onNavigationChange = jest.fn();

        render(<Navigation onNavigationChange={onNavigationChange}/>)

        expect(screen.getByTestId('navigation')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('new-stuff'));

        expect(onNavigationChange).toHaveBeenCalledWith(2);

        fireEvent.click(screen.getByTestId('new-stuff'));

        expect(onNavigationChange).toHaveBeenCalledTimes(1);
    })
})