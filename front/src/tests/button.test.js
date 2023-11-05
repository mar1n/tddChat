import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/Button/button";

describe('Button,', () => { 
    test('render button.', () => { 
        render(<Button />)

        expect(screen.getByRole("button")).toBeInTheDocument();
     })
    test('has label.', () => {
        render(<Button label="clickMe" />)

        expect(screen.getByText("clickMe")).toBeInTheDocument();
    });
    test('has name.', () => { 
        render(<Button label="clickMe" name="buttonName"/>)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('name', "buttonName")
     })
    test('has callback function, onclick event.', async () => {
        const clickFn = jest.fn();
        render(<Button callback={clickFn} />);

        const user = userEvent.setup();

        await user.click(screen.getByRole("button"));

        expect(clickFn).toHaveBeenCalled();
     });
     test('has type.', () => { 
        render(<Button label="clickMe" type="button" />)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', "button")
      });
     test('has className.', () => { 
        render(<Button label="clickMe" className="buttonStyle" />)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("buttonStyle");
      });
     test('has disabled attribute.', () => { 
        render(<Button label="clickMe" disabled={false} />)

        let button = screen.getByText("clickMe");
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
      });
})