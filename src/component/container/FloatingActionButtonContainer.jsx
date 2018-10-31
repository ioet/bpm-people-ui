import { connect } from 'react-redux';
import { Add, Clear } from '@material-ui/icons';
import React from 'react';
import { startOrEndCreateUser } from '../../actions';
import FloatingActionButton from '../presentational/FloatingActionButton';
import { FloatingActionButtonConst } from '../../constants';

const mapStateToProps = state => ({
  tooltip: (state.userEdit.editing)
    ? FloatingActionButtonConst.TOOLTIP_DISCARD
    : FloatingActionButtonConst.TOOLTIP_ADD,
  icon: (state.userEdit.editing) ? <Clear /> : <Add />,
});

const mapDispatchToProps = dispatch => ({
  createUser: () => {
    dispatch(startOrEndCreateUser());
  },
});

const FloatingActionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingActionButton);

export default FloatingActionButtonContainer;
