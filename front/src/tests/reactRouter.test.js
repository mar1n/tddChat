import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

describe('Router', () => { 
    describe('Display home page', () => { 
        render(<App />);

        const home = screen.getByText("Home");
        expect(home).toBeInDocument();
     })
 })