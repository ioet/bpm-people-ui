/* eslint-disable react/jsx-tag-spacing,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {
  Clear, Delete, Done, Edit,
} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import { ButtonType, TooltipConst, UserListItemConst } from '../../constants';
import { MyIconButtonStyles } from '../../styles';

const MyIconButton = (props) => {
  const {
    classes, editId, userId, onUserEdit, onUserRemoved, type, hover, hoverId,
  } = props;
  const showItem = (hover && hoverId === userId) ? classes.show : classes.hide;

  let icon;
  let tooltip;

  if (type === ButtonType.EDIT) {
    icon = (editId === userId) ? <Done/> : <Edit/>;
    tooltip = (editId === userId) ? UserListItemConst.TOOLTIP_SAVE : UserListItemConst.TOOLTIP_EDIT;
  } else {
    icon = (editId === userId) ? <Clear/> : <Delete/>;
    tooltip = (editId === userId) ? UserListItemConst.TOOLTIP_DISCARD : UserListItemConst.TOOLTIP_DELETE;
  }

  return (
    <div>
      <Tooltip
        title={tooltip}
        placement="left"
        enterDelay={TooltipConst.ENTER_DELAY}
        leaveDelay={TooltipConst.LEAVE_DELAY}
      >
        <IconButton
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            if (type === ButtonType.EDIT) {
              onUserEdit();
            } else {
              onUserRemoved(editId);
            }
          }}
          className={showItem}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </div>
  );
};

MyIconButton.defaultProps = {
  hoverId: '',
};

MyIconButton.propTypes = {
  classes: PropTypes.any.isRequired,
  editId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onUserEdit: PropTypes.func.isRequired,
  onUserRemoved: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  hover: PropTypes.bool.isRequired,
  hoverId: PropTypes.string,
};

export default withStyles(MyIconButtonStyles)(MyIconButton);
