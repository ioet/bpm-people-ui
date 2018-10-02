/* eslint-disable no-undef,camelcase,prefer-destructuring,max-len,prefer-arrow-callback */
import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';
import {
  editOrUpdateUser, removeUserAsync,
  setEditUserData,
} from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  edit: (typeof state.userEditData.id === 'undefined') ? '' : state.userEditData.id,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (user) => {
    dispatch(editOrUpdateUser(user));
  },
  onChange: (event) => {
    dispatch(setEditUserData(event.target.name, event.target.value));
  },
  onUserRemoved: (user) => {
    // delete user per api
    dispatch(removeUserAsync(user));
  },
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default ListItemContainer;
