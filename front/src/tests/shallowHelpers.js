import ShallowRenderer from 'react-test-renderer/shallow';

export const id = id => element => element.props && element.props.id === id;
export const className = className => element => element.props.className === className;
export const click = element => element.props.onClick();
export const type = type => element => element.type === type;
export const elementsMatching = (element, matcherFn) => {
    if(matcherFn(element)) {
        return [element]
    }
    return  childrenOf(element).reduce((acc, child) => [...acc,...elementsMatching(child, matcherFn)], []);
};

export const childrenOf = (element) => {
  if (typeof element === "string") {
    return [];
  }
  const {props: {children }} = element;

  if (!children) {
    return [];
  }
  if (typeof children === "string") {
    return [children];
  }
  if(Array.isArray(children)) {
    return children;
  }
  return [children];
};

export const createShallowRenderer = () => {
    let renderer = new ShallowRenderer();

    return {
        shallowRender: component => renderer.render(component),
        root: () => renderer.getRenderOutput(),
        child: n => childrenOf(renderer.getRenderOutput())[n],
        elementsMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn),
        elementMatching: matcherFn => elementsMatching(renderer.getRenderOutput(), matcherFn)[0]
    }
}
