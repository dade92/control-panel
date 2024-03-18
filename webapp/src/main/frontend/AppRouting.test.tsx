import {fireEvent, render, screen} from "@testing-library/react";
import {AppRouting} from "./AppRouting";
import '@testing-library/jest-dom';

describe('App', () => {
    it('should render properly', () => {
        render(<AppRouting/>)

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();
    })

    it('should change screen when navigating', () => {
        render(<AppRouting/>)

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