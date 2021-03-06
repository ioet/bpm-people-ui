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
  overrides: {
    MuiTableCell: {
      root: {
        maxWidth: '140px',
      },
      body: {
        padding: '0',
      },
      paddingCheckbox: {
        width: '0',
      },
    },
    MuiCheckbox: {
      checked: {
        color: `${deepOrange.A400} !important`,
      },
    },
    MUIDataTableToolbar: {
      icon: {
        '&:hover': {
          color: teal['500'],
        },
      },
    },
  },
});

export const BpmButtonStyles = theme => ({
  button: {
    position: 'fixed',
    top: theme.spacing.unit * 13,
    left: theme.spacing.unit * 22,
    zIndex: 100,
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
    width: '90%',
    margin: 'auto',
    padding: theme.spacing.unit * 1,
  },
  button: {
    margin: theme.spacing.unit * 1,
  },
});

export const UserListStyles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 1,
    width: '90%',
    margin: 'auto',
  },
  iconButton: {
    width: theme.spacing.unit * 6,
    height: theme.spacing.unit * 6,
    top: '50%',
    display: 'block',
    position: 'relative',
    transform: 'translateY(-50%)',
    marginRight: theme.spacing.unit * 3,
    '&:hover': {
      color: teal['500'],
    },
  },
});

export const BpmIconButtonStyles = () => ({
  hide: {
    visibility: 'hidden',
  },
  show: {
    visibility: 'visible',
  },
});

export const TableCellStyles = theme => ({
  cell: {
    height: 'auto',
    lineHeight: theme.spacing.unit / 2,
    verticalAlign: 'middle',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit * 3,
  },
});
