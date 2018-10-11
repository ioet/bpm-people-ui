/* eslint-disable camelcase,react/forbid-prop-types, react/jsx-tag-spacing */
import React from 'react';
import { compose } from 'redux';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { withWidth } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import {
  Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem/ListItem';
import { isWidthUp } from '@material-ui/core/withWidth';
import Typography from '@material-ui/core/Typography/Typography';
import { TooltipConst, UserListItemConst } from '../../constants';
import { UserListItemStyles } from '../../styles';

const UserListItem = (props) => {
  const {
    classes, width, editId, user, onChange, onUserEdit, onUserRemoved, inputError,
    onMouseOver, onMouseOut, hover, hoverId,
  } = props;

  const { id, name, authentication_identity } = user;
  const showItem = (hover && hoverId === user.id) ? classes.show : classes.hide;

  if (isWidthUp('sm', width)) {
    return (
      <TableRow
        hover
        onFocus={(e) => {
          e.preventDefault();
          onMouseOver(user.id);
        }}
        onMouseOver={(e) => {
          e.preventDefault();
          onMouseOver(user.id);
        }}
        onMouseOut={onMouseOut}
        onBlur={onMouseOut}
      >
        <TableCell className={classes.tableCell} component="td" scope="row">
          {
            (editId === id)
              ? (
                <TextField
                  error={inputError.name}
                  name="name"
                  defaultValue={name}
                  label={UserListItemConst.EDIT_NAME}
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
                    label={UserListItemConst.EDIT_EMAIL}
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
        >
          <Tooltip
            title={
              (editId === id)
                ? (
                  UserListItemConst.TOOLTIP_SAVE
                ) : (
                  UserListItemConst.TOOLTIP_EDIT
                )}
            placement="left"
            enterDelay={TooltipConst.ENTER_DELAY}
            leaveDelay={TooltipConst.LEAVE_DELAY}
          >
            <IconButton
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                onUserEdit(user);
              }}
              className={showItem}
            >
              {
                (editId === id)
                  ? (
                    <Done/>
                  ) : (
                    <Edit/>
                  )
              }
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell
          className={[classes.tableCell, classes.pointerButton].join(' ')}
          numeric
        >
          <Tooltip
            title={
              (editId === id)
                ? (
                  UserListItemConst.TOOLTIP_DISCARD
                ) : (
                  UserListItemConst.TOOLTIP_DELETE
                )}
            placement="left"
            enterDelay={TooltipConst.ENTER_DELAY}
            leaveDelay={TooltipConst.LEAVE_DELAY}
          >
            <IconButton
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                onUserRemoved(user, editId);
              }}
              className={showItem}
            >
              {
                (editId === id)
                  ? (
                    <Clear/>
                  ) : (
                    <Delete/>
                  )
              }
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <ListItem
      divider
      selected={hover && hoverId === user.id}
      className={classes.phoneRoot}
      onFocus={(e) => {
        e.preventDefault();
        onMouseOver(user.id);
      }}
      onMouseOver={(e) => {
        e.preventDefault();
        onMouseOver(user.id);
      }}
      onMouseOut={onMouseOut}
      onBlur={onMouseOut}
    >
      <div className={classes.phoneCard}>
        <div className={classes.phoneButtonWrapper}>
          <div className={classes.phoneButtons}>
            <Tooltip
              title={
                (editId === id)
                  ? (
                    UserListItemConst.TOOLTIP_SAVE
                  ) : (
                    UserListItemConst.TOOLTIP_EDIT
                  )}
              placement="bottom"
              enterDelay={TooltipConst.ENTER_DELAY}
              leaveDelay={TooltipConst.LEAVE_DELAY}
            >
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onUserEdit(user);
                }}
              >
                {
                  (editId === id)
                    ? (
                      <Done/>
                    ) : (
                      <Edit/>
                    )
                }
              </IconButton>
            </Tooltip>
            <Tooltip
              title={
                (editId === id)
                  ? (
                    UserListItemConst.TOOLTIP_DISCARD
                  ) : (
                    UserListItemConst.TOOLTIP_DELETE
                  )}
              placement="bottom"
              enterDelay={TooltipConst.ENTER_DELAY}
              leaveDelay={TooltipConst.LEAVE_DELAY}
            >
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.preventDefault();
                  onUserRemoved(user, editId);
                }}
              >
                {
                  (editId === id)
                    ? (
                      <Clear/>
                    ) : (
                      <Delete/>
                    )
                }
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.phoneContent}>
          {
            (editId === id)
              ? (
                <div>
                  <TextField
                    error={inputError.name}
                    name="name"
                    defaultValue={name}
                    label={UserListItemConst.EDIT_NAME}
                    id="mui-theme-provider-input"
                    onChange={
                      (e) => {
                        e.preventDefault();
                        onChange(e, editId);
                      }
                    }
                  />
                  <form
                    className={classes.phoneForm}
                    onSubmit={(e) => {
                      e.preventDefault();
                      onUserEdit(user);
                    }}
                  >
                    <TextField
                      error={inputError.authentication_identity}
                      name="authentication_identity"
                      defaultValue={authentication_identity}
                      label={UserListItemConst.EDIT_EMAIL}
                      id="mui-theme-provider-input"
                      onChange={
                        (e) => {
                          e.preventDefault();
                          onChange(e, editId);
                        }
                      }
                    />
                  </form>
                </div>
              ) : (
                <div>
                  <div className={classes.phoneKeyWrapper}>
                    <Typography variant="subtitle1" className={classes.phoneKey}>
                      {UserListItemConst.NAME}
                    </Typography>
                    <Typography variant="subtitle1">
                      {name}
                    </Typography>
                  </div>
                  <div className={classes.phoneKeyWrapper}>
                    <Typography variant="subtitle1" className={classes.phoneKey}>
                      {UserListItemConst.EMAIL}
                    </Typography>
                    <Typography variant="subtitle1">
                      {authentication_identity}
                    </Typography>
                  </div>
                </div>
              )
          }
        </div>
      </div>
    </ListItem>
  );
};

UserListItem.defaultProps = {
  hoverId: '',
};

UserListItem.propTypes = {
  classes: PropTypes.any.isRequired,
  width: PropTypes.string.isRequired,
  editId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onUserEdit: PropTypes.func.isRequired,
  onUserRemoved: PropTypes.func.isRequired,
  inputError: PropTypes.object.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  hover: PropTypes.bool.isRequired,
  hoverId: PropTypes.string,
};

export default compose(
  withStyles(UserListItemStyles),
  withWidth(),
)(UserListItem);
