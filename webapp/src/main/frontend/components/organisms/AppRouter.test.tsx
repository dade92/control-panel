import {fireEvent, render, screen} from "@testing-library/react";
import {AppRouter} from "./AppRouter";
import '@testing-library/jest-dom';

describe('AppRouter', () => {
    it('should render properly', () => {
        render(<AppRouter/>)

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();
    })

    it('should change screen when navigating', () => {
        render(<AppRouter/>)

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();
        expect(screen.queryByTestId('favourites-wrapper')).not.toBeInTheDocument();
        expect(screen.queryByTestId('new-stuff-wrapper')).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('favourites'));

        expect(screen.queryByTestId('loader-wrapper')).not.toBeInTheDocument();
        expect(screen.getByTestId('favourites-wrapper')).toBeVisible();
        expect(screen.queryByTestId('new-stuff-wrapper')).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId('new-stuff'));

        expect(screen.queryByTestId('loader-wrapper')).not.toBeInTheDocument();
        expect(screen.queryByTestId('favourites-wrapper')).not.toBeInTheDocument();
        expect(screen.getByTestId('new-stuff-wrapper')).toBeVisible();
    });

})