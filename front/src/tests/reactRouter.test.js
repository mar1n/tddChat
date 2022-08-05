import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "../App";

describe('Router', () => { 
    test('Display home page', () => { 
        render(<App />, {wrapper: BrowserRouter})

        const home = screen.getByText(/You are home/i);
        expect(home).toBeInTheDocument();
     })
     test('should first', () => { 
        render(<App />, {wrapper: BrowserRouter});
        const user = userEvent.setup();
        const home = screen.getByText(/You are home/i);
        expect(home).toBeInTheDocument();

        const about = screen.getByText(/About/i);
        user.click(about);
        expect(about).toBeInTheDocument();
     })
 })