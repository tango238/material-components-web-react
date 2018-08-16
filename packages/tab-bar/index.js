import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {MDCTabBarFoundation} from '@material/tab-bar/dist/mdc.tabBar';

export default class TabBar extends Component {
  tabBarElement_ = React.createRef();
  tabScroller_ = React.createRef();
  tabList_ = null;
  foundation_ = null;

  componentDidMount() {
    this.tabList_ = this.tabScroller_.props.children;

    this.foundation_ = new MDCTabBarFoundation(this.adapter);
    this.foundation_.init();
  }

  componentWillUnmount() {
    this.foundation_.destroy();
  }

  get classes() {
    return classnames('mdc-tab-bar', this.props.className);
  }

  get adapter() {
    return {
      scrollTo: (scrollX) => this.tabScroller_.scrollTo(scrollX),
      incrementScroll: (scrollXIncrement) => this.tabScroller_.incrementScroll(scrollXIncrement),
      getScrollPosition: () => this.tabScroller_.getScrollPosition(),
      getScrollContentWidth: () => this.tabScroller_.getScrollContentWidth(),
      getOffsetWidth: () => this.tabBarElement_.offsetWidth,
      isRTL: () => window.getComputedStyle(this.tabBarElement_).getPropertyValue('direction') === 'rtl',
      activateTabAtIndex: (index, clientRect) => this.tabList_[index].activate(clientRect),
      deactivateTabAtIndex: (index) => this.tabList_[index].deactivate(),
      focusTabAtIndex: (index) => this.tabList_[index].focus(),
      getTabIndicatorClientRectAtIndex: (index) => this.tabList_[index].computeIndicatorClientRect(),
      getTabDimensionsAtIndex: (index) => this.tabList_[index].computeDimensions(),
      getActiveTabIndex: () => {
        for (let i = 0; i < this.tabList_.length; i++) {
          if (this.tabList_[i].active) {
            return i;
          }
        }
        return -1;
      },
      getFocusedTabIndex: () => {
        const activeElement = document.activeElement;
        return this.tabList_.indexOf((tab) => tab.tabElement_.current === activeElement);
      },
      getIndexOfTab: (tabToFind) => this.tabList_.indexOf(tabToFind),
      getTabListLength: () => this.tabList_.length,
    };
  }

  activateTab(index) {
    this.foundation_.activateTab(index);
  }

  scrollIntoView(index) {
    this.foundation_.scrollIntoView(index);
  }

  render() {
    const {
      children,
      className, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        className={this.classes}
        role='tablist'
        {...otherProps}
      >
        {children}
      </div>
    );
  }
}

TabBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

TabBar.defaultProps = {
  className: '',
  children: null,
};