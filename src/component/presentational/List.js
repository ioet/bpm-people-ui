import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import withStyles from '@material-ui/core/styles/withStyles';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import ListItemContainer from '../container/ListItemContainer';

const tableHeadStyle = {
  textAlign: 'center',
  paddingRight: '24px',
};

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const List = (props) => {
  const { classes } = props;

  const users = props.userList.map((user) => {
    return (
      <ListItemContainer key={user.guid} user={user}/>
    );
  });

  return (
    <div>
      <br/>
      <Typography variant="title" component="h5">
        Here are all users currently saved in our system:
      </Typography>
      {users.length > 0 ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Email
              </TableCell>
              <TableCell numeric style={tableHeadStyle}>
                Edit
              </TableCell>
              <TableCell numeric style={tableHeadStyle}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users}
          </TableBody>
        </Table>

      ) : (
        <Typography variant="subheading" component="h5">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(List);
