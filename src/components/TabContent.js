import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
    activeTab:  PropTypes.string.isRequired
  };

  render() {
    const { children, activeTab } = this.props;
    return (
      <div className="full-width">
        {children.map((child) => {
          return child.props.label === activeTab 
            ?  child
            : undefined;
        })}
      </div>
    );
  }
}


export default Tab;