/* eslint-disable react/jsx-tag-spacing,react/forbid-prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';
import PropTypes from 'prop-types';
import { FooterConst } from '../../constants';
import { FooterStyles } from '../../styles';

const Footer = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Button color="primary" href={FooterConst.BPM_GITHUB} className={classes.button}>
        { FooterConst.LEARN_MORE }
      </Button>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.any.isRequired,
};

export default withStyles(FooterStyles)(Footer);
