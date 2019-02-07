import React, { Component } from 'react';
import OHIFCornerstoneViewport from './OHIFCornerstoneViewport.js';

/**
 * Pass in 'children' to a React component. The purpose of this is to
 * allow end users of this extension to pass in components which will
 * be rendered on top of the base components.
 *
 * @param WrappedComponent
 * @param children
 * @return {function(*): *}
 */
function withChildren(WrappedComponent, children) {
  return function(props) {
    return <WrappedComponent children={children} { ...props } />;
  };
}

// Note: If you are authoring extensions which use stateful libraries (e.g. cornerstone-core, react-redux) as peerDependencies and are also duplicated at the application level, try using 'yalc' to link it to the application, rather than yarn link. This can help fix 'module not found' issues.
// https://github.com/whitecolor/yalc

export default class OHIFCornerstoneExtension {
  constructor(children) {
    this.children = children;
  }

  /**
   * Extension ID is a unique id, might be used for namespacing extension specific redux actions/reducers (?)
   */
  getExtensionId() {
    return 'cornerstone';
  }

  getViewportModule() {
    if (this.children && this.children.viewport) {
      return withChildren(OHIFCornerstoneViewport, this.children.viewport);
    }

    return OHIFCornerstoneViewport;
  }

  getSopClassHandler() {
    return null;
  }

  getPanelModule() {
    return null;
  }

  getToolbarModule() {
    return null;
  }
}
