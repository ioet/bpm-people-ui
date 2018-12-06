import React from 'react';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import MyIconButton from '../presentational/MyIconButton';
import { prepareEditUser } from '../../actions';
import { getHoverId, isHoverActive } from '../../selectors';
import { UserListItemConst } from '../../constants';

const mapStateToProps = state => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: <Edit />,
  tooltip: UserListItemConst.TOOLTIP_EDIT,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(prepareEditUser(ownProps.userId));
  },
});

const MyEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyEditButtonContainer;
