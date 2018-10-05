/* eslint-disable react/prop-types,react/jsx-tag-spacing */
import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider/Divider';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import ListContainer from './component/container/ListContainer';
import CreateUserContainer from './component/container/CreateUserContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';
import { AppStyles } from './styles';
import { AppConst } from './constants';

function App(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="title" color="inherit" >
            {AppConst.CREATE_NEW_USER}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.root} elevation={1}>
        <CreateUserContainer/>
        <Divider/>
        <ListContainer/>
        <Footer/>
      </Paper>
      <ErrorSnackbarContainer/>
    </div>
  );
}

export default withStyles(AppStyles)(App);
