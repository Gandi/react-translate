// @flow

/**
 * Find the name to display for a given component
 * Taken from react-redux.
 *
 * @param ReactClass<*> WrappedComponent
 * @return String
 */
export function getDisplayName(WrappedComponent: ReactClass<*>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * Check wether a routeable component defines `methodName`.
 * Check recursively until method is implemented OR
 * the component does not define a WrappedComponent property.
 */
export function getDataDependency(component: Object = {}, methodName: string): any {
  if (typeof component[methodName] === 'function') {
    return component[methodName];
  }

  if (component.WrappedComponent) {
    return getDataDependency(component.WrappedComponent, methodName);
  }

  return null;
}

/**
 * Return the props and extraProps merged or extraProps namespaced.
 * Useful to separate components own props and decorators injected props.
 */
export function getProps(
  props: Object,
  extraProps: Object,
  propsNamespace?: string
): Object {
  let finalProps: Object;

  if (!propsNamespace) {
    finalProps = { ...props, ...extraProps };
  } else {
    finalProps = {
      ...props,
      [propsNamespace]: { ...extraProps },
    };
  }

  return finalProps;
}
