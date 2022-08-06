import { render, screen } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";
import Router from "../components/Router/Router";

describe('Router', () => { 
    test('Display home page', () => { 
        render(<Router />, {wrapper: BrowserRouter})

        const home = screen.getByText(/You are at home/i);
        expect(home).toBeInTheDocument();
     })
     test('should first', () => { 
        render(<Router />, {wrapper: BrowserRouter});
        const user = userEvent.setup();
        const home = screen.getByText(/You are at home/i);
        expect(home).toBeInTheDocument();

        const homeLink = screen.getByRole("link", { name: "Home"});
        user.click(homeLink);
        expect(home).toBeInTheDocument();
     })
 })