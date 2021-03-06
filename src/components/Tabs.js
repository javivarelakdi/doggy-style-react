import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tabs extends Component {
  static propTypes = {
    labels: PropTypes.instanceOf(Array).isRequired,
    activeTab:  PropTypes.string.isRequired,
    onClickTabItem: PropTypes.func.isRequired
  }

  

  render() {

    const { labels, activeTab, onClickTabItem } = this.props;
    const classNames = "col-6 ta-center full-height flex-row ai-center jc-center"
    return (
      <div className="tab-list full-width flex-row">
        <ul className="col-12 flex-row jc-between fc-dark">
          {labels.map((label, i) => {
            return (
              <li 
                key={i}
                className={ label === activeTab ? `${classNames} tab-list__active-tab` : classNames }
                onClick={() => onClickTabItem(label)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

