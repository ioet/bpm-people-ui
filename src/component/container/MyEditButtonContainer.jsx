import { connect } from 'react-redux';
import { Done, Edit } from '@material-ui/icons';
import React from 'react';
import MyIconButton from '../presentational/MyIconButton';
import { editUpdateOrCreateUser } from '../../actions';
import { UserListItemConst } from '../../constants';

const mapStateToProps = (state, ownProps) => ({
  hover: state.hover.hover,
  hoverId: state.hover.id,
  icon: (state.userEdit.id === ownProps.user.id) ? <Done /> : <Edit />,
  tooltip: (state.userEdit.id === ownProps.user.id)
    ? UserListItemConst.TOOLTIP_SAVE
    : UserListItemConst.TOOLTIP_EDIT,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(editUpdateOrCreateUser(ownProps.user));
  },
});

const MyEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyEditButtonContainer;
