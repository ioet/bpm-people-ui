import React from 'react';
import MenuPanel from './MenuPanel';
import styles from '../generalStyle.css';
import BodyPanel from './BodyPanel';

class PageContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      bodyTitle: 'Nothing',
    };
  }


  render() {
    return (
      <div className={styles.pageContainerStyle}>
        <MenuPanel />
        <BodyPanel />
      </div>

    );
  }
}

export default PageContainer;
