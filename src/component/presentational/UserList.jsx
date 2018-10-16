/* eslint-disable react/display-name,react/forbid-prop-types,react/jsx-tag-spacing */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import { Delete } from '@material-ui/icons';
import {
  ButtonType, UserListConst, UserListItemConst, Variable,
} from '../../constants';
import { UserListStyles } from '../../styles';
import EditOrPlainTextContainer from '../container/EditOrPlainTextContainer';
import { getUserObjectFromArray } from '../utils/Utils';
import MyIconButtonContainer from '../container/MyIconButtonContainer';
import MyTableCellContainer from '../container/MyTableCellContainer';

const UserList = (props) => {
  const {
    classes, userList, onRemoveUsers,
  } = props;

  const data = userList.map(user => (
    [user.id, user.name, user.authentication_identity, false, false]
  ));

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
        customBodyRender: (value, tableMeta) => (
          <MyTableCellContainer user={getUserObjectFromArray(tableMeta.rowData)}>
            <EditOrPlainTextContainer
              user={getUserObjectFromArray(tableMeta.rowData)}
              value={value}
              name={Variable.NAME}
              label={UserListItemConst.EDIT_NAME}
            />
          </MyTableCellContainer>
        ),
      },
    },
    {
      name: UserListConst.COLUMN_2,
      options: {
        customBodyRender: (value, tableMeta) => (
          <MyTableCellContainer user={getUserObjectFromArray(tableMeta.rowData)}>
            <EditOrPlainTextContainer
              user={getUserObjectFromArray(tableMeta.rowData)}
              value={value}
              name={Variable.AUTHENTICATION_IDENTITY}
              label={UserListItemConst.EDIT_EMAIL}
            />
          </MyTableCellContainer>
        ),
      },
    },
    {
      name: UserListConst.COLUMN_3,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => (
          <MyTableCellContainer user={getUserObjectFromArray(tableMeta.rowData)}>
            <MyIconButtonContainer
              user={getUserObjectFromArray(tableMeta.rowData)}
              type={ButtonType.EDIT}
            />
          </MyTableCellContainer>
        ),
      },
    },
    {
      name: UserListConst.COLUMN_4,
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta) => (
          <MyTableCellContainer user={getUserObjectFromArray(tableMeta.rowData)}>
            <MyIconButtonContainer
              user={getUserObjectFromArray(tableMeta.rowData)}
              type={ButtonType.DELETE}
            />
          </MyTableCellContainer>
        ),
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
          const selectedUsers = selected.data.map(u => data[u.dataIndex]);
          onRemoveUsers(selectedUsers);
        }}
        className={classes.iconButton}
      >
        <Delete/>
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
  userList: PropTypes.array.isRequired,
  onRemoveUsers: PropTypes.func.isRequired,
};

export default withStyles(UserListStyles)(UserList);
