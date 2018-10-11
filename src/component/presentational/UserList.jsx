/* eslint-disable react/jsx-tag-spacing,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withWidth } from '@material-ui/core';
import { isWidthUp } from '@material-ui/core/withWidth';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography/Typography';
import Table from '@material-ui/core/Table/Table';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableBody from '@material-ui/core/TableBody/TableBody';
import List from '@material-ui/core/List/List';
import { UserListStyles } from '../../styles';
import { UserListConst } from '../../constants';
import UserListItemContainer from '../container/UserListItemContainer';

const UserList = (props) => {
  const { classes, width, userList } = props;

  const users = userList.map(user => (
    <UserListItemContainer key={user.id} user={user}/>
  ));

  if (isWidthUp('sm', width)) {
    return (
      <div className={classes.root}>
        {users.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  {UserListConst.COLUMN_1}
                </TableCell>
                <TableCell className={classes.tableHead}>
                  {UserListConst.COLUMN_2}
                </TableCell>
                <TableCell className={[classes.tableHead, classes.tableHeadIcon].join(' ')} numeric>
                  {UserListConst.COLUMN_3}
                </TableCell>
                <TableCell className={[classes.tableHead, classes.tableHeadIcon].join(' ')} numeric>
                  {UserListConst.COLUMN_4}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users}
            </TableBody>
          </Table>
        ) : (
          <Typography variant="subheading">
            {UserListConst.LOADING}
          </Typography>
        )}
      </div>
    );
  }

  return (
    <div className={classes.phoneRoot}>
      {users.length > 0 ? (
        <List>
          {users}
        </List>
      ) : (
        <Typography variant="subheading">
          {UserListConst.LOADING}
        </Typography>
      )}
    </div>
  );
};

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  userList: PropTypes.array.isRequired,
};

export default compose(
  withStyles(UserListStyles),
  withWidth(),
)(UserList);
