/* eslint-disable camelcase,react/forbid-prop-types, react/jsx-tag-spacing */
import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {
  Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { ListItemConst } from '../../constants';
import { ListItemStyles } from '../../styles';

const ListItem = (props) => {
  const {
    classes, editId, user, onChange, onUserEdit, onUserRemoved, inputError,
  } = props;
  const { id, name, authentication_identity } = user;

  return (
    <TableRow>
      <TableCell className={classes.tableCell} component="td" scope="row">
        {
          (editId === id)
            ? (
              <TextField
                error={inputError.name}
                name="name"
                defaultValue={name}
                label={ListItemConst.EDIT_NAME}
                id="mui-theme-provider-input"
                onChange={
                  (e) => {
                    e.preventDefault();
                    onChange(e, editId);
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
              <form onSubmit={(e) => {
                e.preventDefault();
                onUserEdit(user);
              }}
              >
                <TextField
                  error={inputError.authentication_identity}
                  name="authentication_identity"
                  defaultValue={authentication_identity}
                  label={ListItemConst.EDIT_EMAIL}
                  id="mui-theme-provider-input"
                  onChange={
                    (e) => {
                      e.preventDefault();
                      onChange(e, editId);
                    }
                  }
                />
              </form>
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
        <IconButton color="primary">
          {
            (editId === id)
              ? (
                <Done/>
              ) : (
                <Edit/>
              )
          }
        </IconButton>
      </TableCell>
      <TableCell
        className={[classes.tableCell, classes.pointerButton].join(' ')}
        numeric
        onClick={(e) => {
          e.preventDefault();
          onUserRemoved(user, editId);
        }}
      >
        <IconButton color="primary">
          {
            (editId === id)
              ? (
                <Clear/>
              ) : (
                <Delete/>
              )
          }
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
  inputError: PropTypes.object.isRequired,
};

export default withStyles(ListItemStyles)(ListItem);
