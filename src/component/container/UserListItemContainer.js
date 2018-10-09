import { connect } from 'react-redux';
import ListItem from '../presentational/UserListItem';
import {
  clearUser, editUpdateOrCreateUser, setUserEditData, showDeleteDialog,
} from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  inputError: state.inputError,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (user) => {
    dispatch(editUpdateOrCreateUser(user));
  },
  onChange: (event) => {
    dispatch(setUserEditData(event.target.name, event.target.value));
  },
  onUserRemoved: (user, editId) => {
    if (user.id === editId) {
      dispatch(clearUser(user));
    } else {
      dispatch(showDeleteDialog(user, editId));
    }
  },
});

const UserListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default UserListItemContainer;
