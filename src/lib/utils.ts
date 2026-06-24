import React from 'react';

export function nbHyphens(node: React.ReactNode): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (typeof child === 'string') return child.replace(/(\w)-(\w)/g, '$1‑$2');
    if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
      return React.cloneElement(child, {}, nbHyphens(child.props.children));
    }
    return child;
  });
}
