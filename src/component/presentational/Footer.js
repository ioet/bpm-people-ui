import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const Footer = (props) => {
  const { classes } = props;

  return (
    <div>
      <br/>
      <Button color="primary" href="https://github.com/ioet/" className={classes.button}>
        Learn more about bpm
      </Button>
    </div>
  );
};

export default withStyles(styles)(Footer);
