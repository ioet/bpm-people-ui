import React from 'react';
import MenuItem from './MenuItem';
import styles from '../generalStyle.css';

const MenuPanel = () => (
  <div className={styles.menuPanelStyle}>
    <MenuItem text="People" />
    <MenuItem text="Projects" />
    <MenuItem text="Skills" />
  </div>
);

export default MenuPanel;
