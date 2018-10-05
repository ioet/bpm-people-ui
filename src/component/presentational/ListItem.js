/* eslint-disable camelcase,react/forbid-prop-types, react/jsx-tag-spacing */
import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { Delete, Done, Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ListItemConst } from '../../constants';
import { ListItemStyles } from '../../styles';

const ListItem = (props) => {
  const {
    classes, editId, user, onChange, onUserEdit, onUserRemoved,
  } = props;
  const { id, name, authentication_identity } = user;

  return (
    <TableRow>
      <TableCell className={classes.tableCell} component="td" scope="row">
        {
          (editId === id)
            ? (
              <TextField
                name="name"
                defaultValue={name}
                label={ListItemConst.EDIT_NAME}
                id="mui-theme-provider-input"
                onChange={
                  (e) => {
                    e.preventDefault();
                    onChange(e);
                  }
                }
              />
            ) : (
              name
            )
        }
      </TableCell>
      <TableCell className={classes.tableCell}>
        {
          (editId === id)
            ? (
              <TextField
                name="authentication_identity"
                defaultValue={authentication_identity}
                label={ListItemConst.EDIT_EMAIL}
                id="mui-theme-provider-input"
                onChange={
                  (e) => {
                    e.preventDefault();
                    onChange(e);
                  }
                }
              />
            ) : (
              authentication_identity
            )
        }
      </TableCell>
      <TableCell
        className={[classes.tableCell, classes.pointerButton].join(' ')}
        numeric
        onClick={(e) => {
          e.preventDefault();
          onUserEdit(user);
        }}
      >
        {
          (editId === id)
            ? (
              <IconButton color="primary">
                <Done/>
              </IconButton>
            ) : (
              <IconButton color="primary">
                <Edit/>
              </IconButton>
            )
        }
      </TableCell>
      <TableCell
        className={[classes.tableCell, classes.pointerButton].join(' ')}
        numeric
        onClick={(e) => {
          e.preventDefault();
          onUserRemoved(user);
        }}
      >
        <IconButton color="primary">
          <Delete/>
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

ListItem.propTypes = {
  classes: PropTypes.any.isRequired,
  editId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onUserEdit: PropTypes.func.isRequired,
  onUserRemoved: PropTypes.func.isRequired,
};

export default withStyles(ListItemStyles)(ListItem);
