import { render, screen} from "@testing-library/react";
import Rooms from "../components/Rooms/Rooms";

describe('Rooms', () => { 
    test('render rooms page', () => {
        render(
            <Rooms />
        )

        const welcomMessage = screen.getByText("Rooms page.")
        expect(welcomMessage).toBeInTheDocument();
        const createButton = screen.getByRole("button");
        expect(createButton).toBeInTheDocument();
    });
 })