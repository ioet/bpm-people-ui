import React from 'react';
import { connect } from 'react-redux';
import { Delete } from '@material-ui/icons';
import MyIconButton from '../presentational/MyIconButton';
import { showDeleteDialog } from '../../actions';
import { getHoverId, isHoverActive } from '../../selectors';
import { UserListItemConst } from '../../constants';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Delete />,
  tooltip: UserListItemConst.TOOLTIP_DELETE,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(showDeleteDialog([ownProps.userId]));
  },
});

const MyDeleteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyDeleteButtonContainer;
