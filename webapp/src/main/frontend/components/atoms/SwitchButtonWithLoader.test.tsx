import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import RollerShadesIcon from "@mui/icons-material/RollerShades";
import {SwitchButtonWithLoader} from "./SwitchButtonWithLoader";
import React from "react";
import '@testing-library/jest-dom';

describe('SwitchButtonWithLoader', () => {
    it('should render correctly', async () => {
        const onChange = jest.fn();

        render(
            <SwitchButtonWithLoader isLoading={false} onChange={onChange} icon={<RollerShadesIcon/>}/>
        );
        expect(screen.getByRole('button')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button'));

        expect(onChange).toHaveBeenCalled();
    });
})