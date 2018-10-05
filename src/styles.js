import { createMuiTheme } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';

export const RootTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
});

export const AppStyles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 1,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    width: '90%',
    margin: 'auto',
  },
});

export const SnackbarStyles = theme => ({
  close: {
    minWidth: '10px',
    height: theme.spacing.unit * 4,
  },
});

export const FooterStyles = theme => ({
  root: {
    marginTop: '2%',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export const ListStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableHeading: {
    margin: '8px 0px',
  },
  tableHead: {
    padding: '2px',
  },
  tableHeadIcon: {
    textAlign: 'center',
  },
});

export const ListItemStyles = () => ({
  tableCell: {
    padding: '0px 2px',
    maxWidth: '90px',
    height: '73px',
  },
  pointerButton: {
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1.3rem',
  },
});

export const CreateUserStyles = theme => ({
  root: {
    marginBottom: '2%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    verticalAlign: 'bottom',
    margin: '8px',
  },
});
