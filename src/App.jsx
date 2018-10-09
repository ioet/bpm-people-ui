/* eslint-disable react/prop-types,react/jsx-tag-spacing */
import React from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import ListContainer from './component/container/ListContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';
import { AppStyles } from './styles';
import { AppConst } from './constants';
import FloatingActionButtonContainer from './component/container/FloatingActionButtonContainer';

function App(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="title" color="inherit" >
            {AppConst.APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.root} elevation={1}>
        <ListContainer/>
        <Footer/>
        <FloatingActionButtonContainer/>
      </Paper>
      <ErrorSnackbarContainer/>
    </div>
  );
}

export default withStyles(AppStyles)(App);
