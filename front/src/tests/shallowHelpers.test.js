import React from "react";
import { childrenOf } from "./shallowHelpers";

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
  test('returns no children for text', () => { 
    expect(childrenOf('text')).toEqual([]);
   })
   test('returns array of children for elements with one child', () => { 
        expect(childrenOf(<div><p>A</p></div>)).toEqual([<p>A</p>])
    })
});
