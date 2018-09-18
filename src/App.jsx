import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider/Divider';
import ListData from './component/container/ListData';
import CreateUserContainer from './component/container/CreateUserContainer';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: '40%',
    margin: 'auto',
  },
  snackbar: {
    margin: theme.spacing.unit,
  },
});

function App(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root} elevation={1}>
      <CreateUserContainer />
      <Divider />
      <ListData />
    </Paper>
  );
}

export default withStyles(styles)(App);
