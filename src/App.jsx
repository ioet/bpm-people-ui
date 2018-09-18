/* eslint-disable react/prop-types,react/jsx-tag-spacing */
import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider/Divider';
import ListContainer from './component/container/ListContainer';
import CreateUserContainer from './component/container/CreateUserContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: '50%',
    margin: 'auto',
  },
});

function App(props) {
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <CreateUserContainer/>
        <Divider/>
        <ListContainer/>
        <Footer />
      </Paper>
      <ErrorSnackbarContainer/>
    </div>
  );
}

export default withStyles(styles)(App);
