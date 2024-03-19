import {fireEvent, render, screen} from "@testing-library/react";
import {Navigation} from "./Navigation";
import '@testing-library/jest-dom';
import {NavigationStatus} from "../organisms/AppRouter";

describe('Navigation', () => {
    it('should render correctly and call the callback when clicked', () => {
        const onNavigationChange = jest.fn();

        render(<Navigation onNavigationChange={onNavigationChange}/>)

        expect(screen.getByTestId('navigation')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('new-stuff'));

        expect(onNavigationChange).toHaveBeenCalledWith(NavigationStatus.NEW_STUFF);

        fireEvent.click(screen.getByTestId('new-stuff'));

        expect(onNavigationChange).toHaveBeenCalledTimes(1);
    })
})