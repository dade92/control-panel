import {render, screen} from "@testing-library/react";
import {App} from "./App";
import '@testing-library/jest-dom';

describe('App', () => {
    it('should render properly', () => {
        render(<App/>)

        expect(screen.getByTestId('loader-wrapper')).toBeVisible();
    })

})