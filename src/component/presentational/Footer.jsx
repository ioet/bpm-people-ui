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
      <Button color="primary" href={FooterConst.BPM_GITHUB} className={classes.button} target="_blank">
        {FooterConst.LEARN_MORE}
      </Button>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(FooterStyles)(Footer);
