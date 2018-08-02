import React from 'react';
import PropTypes from 'prop-types';
import styles from './generalStyle.css';

const MenuItem = ({ text }) => (
  <div className={styles.menuItemStyle}>
    {text}
  </div>
);

MenuItem.propTypes = {
  text: PropTypes.string,
};

MenuItem.defaultProps = {
  text: 'item',
};

export default MenuItem;
