import { connect } from 'react-redux';
import UserList from '../presentational/UserList';
import { showDeleteDialog } from '../../actions';

const mapStateToProps = state => ({
  userList: state.userList,
});

const mapDispatchToProps = dispatch => ({
  onRemoveUsers: (userIds) => {
    dispatch(showDeleteDialog(userIds));
  },
});

const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

export default UserListContainer;
