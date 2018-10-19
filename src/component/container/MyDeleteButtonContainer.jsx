import { connect } from 'react-redux';
import { Clear, Delete } from '@material-ui/icons';
import React from 'react';
import MyIconButton from '../presentational/MyIconButton';
import { clearOrShowDelete } from '../../actions';
import { UserListItemConst } from '../../constants';

const mapStateToProps = (state, ownProps) => ({
  hover: state.hover.hover,
  hoverId: state.hover.id,
  icon: (state.userEdit.id === ownProps.user.id) ? <Clear /> : <Delete />,
  tooltip: (state.userEdit.id === ownProps.user.id)
    ? UserListItemConst.TOOLTIP_DISCARD
    : UserListItemConst.TOOLTIP_DELETE,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(clearOrShowDelete([ownProps.user]));
  },
});

const MyDeleteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyDeleteButtonContainer;
