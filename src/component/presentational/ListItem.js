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

const tableCellStyle = {
  padding: '4px 24px',
  maxWidth: '120px',
  minWidth: '120px',
};

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
    this.name = this.props.user.name;
    this.authentication_identity = this.props.user.authentication_identity;

    return (
      <TableRow>
        <TableCell component="th" scope="row" style={tableCellStyle}>
          {
            (this.props.edit === this.props.user.id)
              ? (
                <MuiThemeProvider theme={theme}>
                  <TextField
                    name="name"
                    defaultValue={this.name}
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
                this.name
              )
          }
        </TableCell>
        <TableCell style={tableCellStyle}>
          {
            (this.props.edit === this.props.user.id)
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
            this.props.onUserEdit(this.props.user);
          }}
        >
          {
            (this.props.edit === this.props.user.id)
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
