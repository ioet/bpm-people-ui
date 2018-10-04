/* eslint-disable react/prop-types,camelcase */
import React from 'react';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField/TextField';
import { blue } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import { CreateUserConst } from '../../constants';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const CreateUser = (props) => {
  const {
    classes, name, authentication_identity, createUser, onChange,
  } = props;
  return (
    <div>
      <Typography variant="headline" component="h3">
        {CreateUserConst.CREATE_NEW_USER}
      </Typography>
      <form onSubmit={(e) => {
        e.preventDefault();
        createUser();
      }}
      >
        <MuiThemeProvider theme={theme}>
          <TextField
            name="name"
            value={
              (typeof name === 'undefined')
                ? ''
                : name
            }
            className={classes.margin}
            label={CreateUserConst.ENTER_NAME}
            id="mui-theme-provider-input"
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e);
              }
            }
          />
        </MuiThemeProvider>
        <MuiThemeProvider theme={theme}>
          <TextField
            name="authentication_identity"
            value={
              (typeof authentication_identity === 'undefined')
                ? ''
                : authentication_identity
            }
            className={classes.margin}
            label={CreateUserConst.ENTER_EMAIL}
            id="mui-theme-provider-input"
            onChange={
              (e) => {
                e.preventDefault();
                onChange(e);
              }
            }
          />
        </MuiThemeProvider>
        <Button type="submit" variant="contained" color="primary">
          {CreateUserConst.CREATE}
        </Button>
      </form>
      <br />
    </div>
  );
};

export default withStyles(styles)(CreateUser);
