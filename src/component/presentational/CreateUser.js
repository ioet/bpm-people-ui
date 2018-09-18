/* eslint-disable react/destructuring-assignment,react/prop-types,react/prefer-stateless-function,no-class-assign */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField/TextField';
import { blue } from '@material-ui/core/colors';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';

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

class CreateUser extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="headline" component="h3">
          Create a new user
        </Typography>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.props.validateInput();
        }}
        >
          <MuiThemeProvider theme={theme}>
            <TextField
              name="display_name"
              value={this.props.display_name}
              className={classes.margin}
              label="Enter your name"
              id="mui-theme-provider-input"
              onChange={
                (e) => {
                  e.preventDefault();
                  this.props.onChange(e);
                }
              }
            />
          </MuiThemeProvider>
          <MuiThemeProvider theme={theme}>
            <TextField
              name="authentication_identity"
              value={this.props.authentication_identity}
              className={classes.margin}
              label="Enter your email"
              id="mui-theme-provider-input"
              onChange={
                (e) => {
                  e.preventDefault();
                  this.props.onChange(e);
                }
              }
            />
          </MuiThemeProvider>
          <Button type="submit" variant="contained" color="primary">
            Create user
          </Button>
        </form>
        <br />
      </div>
    );
  }
}

CreateUser = connect()(CreateUser);
export default withStyles(styles)(CreateUser);
