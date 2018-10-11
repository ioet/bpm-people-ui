import { createMuiTheme } from '@material-ui/core';
import { deepOrange, teal } from '@material-ui/core/colors';

export const RootTheme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: deepOrange,
  },
  typography: {
    useNextVariants: true,
  },
});

export const AppStyles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 2,
    width: '90%',
    margin: 'auto',
  },
});

export const FabStyles = () => ({
  fab: {
    position: 'absolute',
    bottom: '3%',
    right: '5%',
  },
});

export const SnackbarStyles = theme => ({
  snackbar: {
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing.unit * 3,
    },
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

export const UserListStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  tableHead: {
    padding: '2px',
  },
  tableHeadIcon: {
    textAlign: 'center',
  },
  phoneRoot: {
    width: '100%',
  },
});

export const UserListItemStyles = theme => ({
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
  hide: {
    visibility: 'hidden',
  },
  show: {
    visibility: 'visible',
  },
  phoneRoot: {
    width: '100%',
    padding: '0px',
  },
  phoneCard: {
    width: '100%',
    margin: '6px 2px',
  },
  phoneButtonWrapper: {
    width: '100%',
    display: 'inline-block',
  },
  phoneButtons: {
    float: 'right',
  },
  phoneContent: {
    padding: theme.spacing.unit * 1,
    paddingTop: '0px',
  },
  phoneForm: {
    marginTop: theme.spacing.unit * 1,
  },
  phoneKeyWrapper: {
    display: 'flex',
  },
  phoneKey: {
    paddingRight: theme.spacing.unit * 1,
  },
});
