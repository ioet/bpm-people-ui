import React from 'react';
import { connect } from 'react-redux';
import { Edit } from '@material-ui/icons';
import BpmIconButton from '../presentational/BpmIconButton';
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

const BpmEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmIconButton);

export default BpmEditButtonContainer;
