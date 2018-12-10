/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import { UserListConst } from '../../constants';
import { UserListStyles } from '../../styles';
import { compareUsersByFirstName, getUserObjectFromArray } from '../utils/Utils';
import BpmTableCellContainer from '../container/BpmTableCellContainer';
import BpmEditButtonContainer from '../container/BpmEditButtonContainer';
import BpmDeleteButtonContainer from '../container/BpmDeleteButtonContainer';

const UserList = (props) => {
  const {
    classes, userList, onRemoveUsers,
  } = props;

  const data = [];
  Object.keys(userList).forEach((key) => {
    const user = userList[key];
    data.push([user.id, user.name, user.authentication_identity, false, false]);
  });
  data.sort(compareUsersByFirstName);

  const columns = [
    {
      name: UserListConst.COLUMN_0,
      options: {
        display: 'excluded',
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: UserListConst.COLUMN_1,
      options: {
        customBodyRender: (value, tableMeta) => {
          const user = getUserObjectFromArray(tableMeta.rowData);
          return (
            <BpmTableCellContainer userId={user.id}>
              {value}
            </BpmTableCellContainer>
          );
        },
      },
    },
    {
      name: UserListConst.COLUMN_2,
      options: {
        customBodyRender: (value, tableMeta) => {
          const user = getUserObjectFromArray(tableMeta.rowData);
          return (
            <BpmTableCellContainer userId={user.id}>
              {value}
            </BpmTableCellContainer>
          );
        },
      },
    },
    {
      name: UserListConst.COLUMN_3,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const user = getUserObjectFromArray(tableMeta.rowData);
          return (
            <BpmTableCellContainer userId={user.id}>
              <BpmEditButtonContainer
                userId={user.id}
              />
            </BpmTableCellContainer>
          );
        },
      },
    },
    {
      name: UserListConst.COLUMN_4,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => {
          const user = getUserObjectFromArray(tableMeta.rowData);
          return (
            <BpmTableCellContainer userId={user.id}>
              <BpmDeleteButtonContainer
                userId={user.id}
              />
            </BpmTableCellContainer>
          );
        },
      },
    },
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'scroll',
    resizableColumns: true,
    selectableRows: true,
    print: false,
    rowsPerPageOptions: [10, 15, 25],
    customToolbarSelect: selected => (
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          const selectedUserIds = selected.data.map(u => data[u.dataIndex][0]);
          onRemoveUsers(selectedUserIds);
        }}
        className={classes.iconButton}
      >
        <Delete />
      </IconButton>
    ),
  };

  return (
    <div className={classes.root}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
  userList: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    authentication_identity: PropTypes.string.isRequired,
  })).isRequired,
  onRemoveUsers: PropTypes.func.isRequired,
};

export default withStyles(UserListStyles)(UserList);
