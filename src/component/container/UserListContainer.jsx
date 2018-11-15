import { connect } from 'react-redux';
import UserList from '../presentational/UserList';
import { showDeleteDialog } from '../../actions';
import { getUserList } from '../../selectors';

const mapStateToProps = state => ({
  userList: getUserList(state),
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
