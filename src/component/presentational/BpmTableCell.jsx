import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { TableCellStyles } from '../../styles';

const BpmTableCell = (props) => {
  const {
    classes, onMouseOver, onMouseOut, children,
  } = props;

  return (
    <div
      className={classes.cell}
      onFocus={(e) => {
        e.preventDefault();
        onMouseOver();
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        onMouseOver();
      }}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
    >
      {children}
    </div>
  );
};

BpmTableCell.propTypes = {
  classes: PropTypes.object.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

export default withStyles(TableCellStyles)(BpmTableCell);
