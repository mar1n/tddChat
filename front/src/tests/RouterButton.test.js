import React from "react";
import { Link } from "react-router-dom";
import { createShallowRenderer, click} from "./shallowHelpers";
import RouterButton from "../components/navigation/RouterButton";

describe('Router Button', () => {
    const pathname = "/path";

    let shallowRender, elementMatching, root;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        ({ shallowRender, elementMatching, root } = createShallowRenderer());
    });

    test('renders a Link', () => { 
        shallowRender(<RouterButton path={pathname} className={"button"} />);
        expect(root().type).toEqual(Link)
        expect(root().props.className).toContain('button');
        expect(root().props.to).toEqual({
            pathname: "/path"
        })
     })

     test('renders children', () => {
        shallowRender(<RouterButton>child text</RouterButton>);
        expect(root().props.children).toEqual("child text");
     });
     test('After click function has been executed.', async () => {
        const someFn = jest.fn();

        click(<RouterButton onClick={() => someFn()} />);

        expect(someFn).toHaveBeenCalled();
     });
});