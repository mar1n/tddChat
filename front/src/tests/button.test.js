import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button/button";

describe('Button,', () => { 
    test('render button.', () => { 
        render(<Button />)

        expect(screen.getByRole("button")).toBeInTheDocument();
     })
    test('has txt.', () => {
        let buttonAttributes = {
            txt: "",
            name: "",
            role: "",
            event: "",
            type: "",
        }
        render(<Button txt="clickMe" />)

        expect(screen.getByText("clickMe")).toBeInTheDocument();
    });
    test('has name.', () => { 
        render(<Button txt="clickMe" name="buttonName"/>)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('name', "buttonName")
     })
    test('has function, onclick event.', async () => {
        const clickFn = jest.fn();
        render(<Button onClick={clickFn} />);

        const user = userEvent.setup();

        await user.click(screen.getByRole("button"));

        expect(clickFn).toHaveBeenCalled();
     });
     test('has type.', () => { 
        render(<Button txt="clickMe" type="button" />)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', "button")
      });
     test.only('has className.', () => { 
        render(<Button txt="clickMe" className="buttonStyle" />)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("buttonStyle");
      });
})