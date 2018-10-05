/* eslint-disable react/jsx-tag-spacing,react/forbid-prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import withStyles from '@material-ui/core/styles/withStyles';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import PropTypes from 'prop-types';
import ListItemContainer from '../container/ListItemContainer';
import { ListStyles } from '../../styles';
import { ListConst } from '../../constants';

const List = (props) => {
  const { classes, userList } = props;

  const users = userList.map(user => (
    <ListItemContainer key={user.id} user={user}/>
  ));

  return (
    <div className={classes.root}>
      <Typography variant="title" className={classes.tableHeading}>
        {ListConst.HEADER}
      </Typography>
      {users.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                {ListConst.COLUMN_1}
              </TableCell>
              <TableCell className={classes.tableHead}>
                {ListConst.COLUMN_2}
              </TableCell>
              <TableCell className={[classes.tableHead, classes.tableHeadIcon].join(' ')} numeric>
                {ListConst.COLUMN_3}
              </TableCell>
              <TableCell className={[classes.tableHead, classes.tableHeadIcon].join(' ')} numeric>
                {ListConst.COLUMN_4}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="subheading">
          {ListConst.LOADING}
        </Typography>
      )}
    </div>
  );
};

List.propTypes = {
  classes: PropTypes.object.isRequired,
  userList: PropTypes.array.isRequired,
};

export default withStyles(ListStyles)(List);
