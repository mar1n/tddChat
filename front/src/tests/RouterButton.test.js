import React from "react";
import { Link } from "react-router-dom";
import { createShallowRenderer } from "./shallowHelpers";
import RouterButton from "../components/navigation/RouterButton";

describe('RouterBUtton', () => {
    const pathname = "/path";

    let shallowRender, elementMatching, root;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        ({ shallowRender, elementMatching, root } = createShallowRenderer());
    });

    test('renders a Link', () => { 
        shallowRender(<RouterButton pathname={pathname} />);
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

     test('add disabled class', () => {
        shallowRender(<RouterButton disabled={true} />)
        expect(root().props.className).toEqual("disabled")
     });
});