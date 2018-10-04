/* eslint-disable react/prop-types,camelcase */
import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { blue } from '@material-ui/core/colors';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import { ListItemConst } from '../../constants';

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

const ListItem = (props) => {
  const {
    classes, edit, user, onChange, onUserEdit, onUserRemoved,
  } = props;
  const { id, name, authentication_identity } = user;

  return (
    <TableRow>
      <TableCell component="th" scope="row" style={tableCellStyle}>
        {
          (edit === id)
            ? (
              <MuiThemeProvider theme={theme}>
                <TextField
                  name="name"
                  defaultValue={name}
                  className={classes.margin}
                  label={ListItemConst.EDIT_NAME}
                  id="mui-theme-provider-input"
                  onChange={
                    (e) => {
                      e.preventDefault();
                      onChange(e);
                    }
                  }
                />
              </MuiThemeProvider>
            ) : (
              name
            )
        }
      </TableCell>
      <TableCell style={tableCellStyle}>
        {
          (edit === id)
            ? (
              <MuiThemeProvider theme={theme}>
                <TextField
                  name="authentication_identity"
                  defaultValue={authentication_identity}
                  className={classes.margin}
                  label={ListItemConst.EDIT_EMAIL}
                  id="mui-theme-provider-input"
                  onChange={
                    (e) => {
                      e.preventDefault();
                      onChange(e);
                    }
                  }
                />
              </MuiThemeProvider>
            ) : (
              authentication_identity
            )
        }
      </TableCell>
      <TableCell
        numeric
        style={pointerButtonStyle}
        onClick={(e) => {
          e.preventDefault();
          onUserEdit(user);
        }}
      >
        {
          (edit === id)
            ? (
              <Typography
                variant="headline"
                component="h6"
                dangerouslySetInnerHTML={{ __html: ListItemConst.CHECK_MARK_ICON }}
              />
            ) : (
              <Typography
                variant="headline"
                component="h6"
                dangerouslySetInnerHTML={{ __html: ListItemConst.PENCIL_ICON }}
              />
            )
        }
      </TableCell>
      <TableCell
        numeric
        style={pointerButtonStyle}
        onClick={(e) => {
          e.preventDefault();
          onUserRemoved(user);
        }}
        dangerouslySetInnerHTML={{ __html: ListItemConst.X_ICON }}
      />
    </TableRow>
  );
};

export default withStyles(styles)(ListItem);
