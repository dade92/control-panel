import {render, screen} from "@testing-library/react";
import {App} from "./App";
import '@testing-library/jest-dom';

describe('App', () => {

    it('should render properly', () => {
        const randomText = 'title text';

        render(<App randomText={randomText}/>)

        const title = screen.getByTestId('title');
        expect(title).toBeVisible();
        expect(title).toHaveTextContent(randomText);
    })

})