import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "../App";

describe('Router', () => { 
    test('Display home page', () => { 
        render(<App />, {wrapper: BrowserRouter})

        const home = screen.getByText(/You are home/i);
        expect(home).toBeInTheDocument();
     })
 })