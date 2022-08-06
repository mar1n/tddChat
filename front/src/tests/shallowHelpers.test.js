import React from "react";
import { childrenOf, createShallowRenderer, type } from "./shallowHelpers";

describe("childrenOf", () => {
  test("return no children", () => {
    expect(childrenOf(<div />)).toEqual([]);
  });
  test("returns direct children", () => {
    expect(
      childrenOf(
        <div>
          <p>A</p>
          <p>B</p>
        </div>
      )
    ).toEqual([<p>A</p>, <p>B</p>]);
  });
  test("return string", () => {
    expect(childrenOf(<div>Text</div>)).toEqual(["Text"]);
  });
  test("returns no children for text", () => {
    expect(childrenOf("text")).toEqual([]);
  });
  test("returns array of children for elements with one child", () => {
    expect(
      childrenOf(
        <div>
          <p>A</p>
        </div>
      )
    ).toEqual([<p>A</p>]);
  });
});

const TestComponent = ({ children }) => <>{children}</>;

describe("child", () => {
  let shallowRender, child;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    ({ shallowRender, child } = createShallowRenderer());
  });
  test("returns undefined if the child does not exist", () => {
    shallowRender(<TestComponent />);
    expect(child(0)).not.toBeDefined();
  });
  test("returns child of rendered element", () => {
    shallowRender(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    );
    expect(child(1)).toEqual(<p>B</p>);
  });
});

describe("elementsMatching", () => {
  let shallowRender, elementsMatching;

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    ({ shallowRender, elementsMatching } = createShallowRenderer());
  });

  test("finds multiple direct children", () => {
    shallowRender(
      <TestComponent>
        <p>A</p>
        <p>B</p>
      </TestComponent>
    );
    expect(elementsMatching(type("p"))).toEqual([<p>A</p>, <p>B</p>]);
  });
  test('finds indirect children', () => { 
    shallowRender(<TestComponent><div><p>A</p></div></TestComponent>);
    expect(elementsMatching(type('p'))).toEqual([<p>A</p>]);
   })
});

describe('elementMatching', () => { 
    let shallowRender, elementMatching;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        ({shallowRender, elementMatching} = createShallowRenderer());
    });

    test('finds first direct child', () => { 
        shallowRender(<TestComponent><p>A</p><p>B</p></TestComponent>);
        expect(elementMatching(type('p'))).toEqual(<p>A</p>)
     })
 })
