/* eslint-disable react/destructuring-assignment,react/prop-types */
import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';

const pointerButtonStyle = {
  cursor: 'pointer',
  padding: '7px',
  textAlign: 'center',
  fontSize: '1.3rem',
};

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

class ListItem extends React.Component {
  render() {
    const { classes } = this.props;

    // save the user data passed as props so that we can display it right away
    this.display_name = this.props.user.display_name;
    this.authentication_identity = this.props.user.authentication_identity;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {
            (this.props.edit === this.props.user.guid)
              ? (
                <MuiThemeProvider theme={theme}>
                  <TextField
                    name="display_name"
                    defaultValue={this.display_name}
                    className={classes.margin}
                    label="Edit your name"
                    id="mui-theme-provider-input"
                    onChange={
                      (e) => {
                        e.preventDefault();
                        this.props.onChange(e);
                      }
                    }
                  />
                </MuiThemeProvider>
              ) : (
                this.display_name
              )
          }
        </TableCell>
        <TableCell>
          {
            (this.props.edit === this.props.user.guid)
              ? (
                <MuiThemeProvider theme={theme}>
                  <TextField
                    name="authentication_identity"
                    defaultValue={this.authentication_identity}
                    className={classes.margin}
                    label="Edit your email"
                    id="mui-theme-provider-input"
                    onChange={
                      (e) => {
                        e.preventDefault();
                        this.props.onChange(e);
                      }
                    }
                  />
                </MuiThemeProvider>
              ) : (
                this.authentication_identity
              )
          }
        </TableCell>
        <TableCell
          numeric
          style={pointerButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            this.props.onUserEdit(e, this.props.user);
          }}
        >
          {
            (this.props.edit === this.props.user.guid)
              ? (
                // check mark
                <Typography variant="headline" component="h6">
                  &#10004;
                </Typography>
              ) : (
                // pencil icon
                <Typography variant="headline" component="h6">
                  &#x270E;
                </Typography>
              )
          }
        </TableCell>
        <TableCell
          numeric
          style={pointerButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            this.props.onUserRemoved(this.props.user);
          }}
        >
          &times;
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(ListItem);
