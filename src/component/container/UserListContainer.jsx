import { connect } from 'react-redux';
import UserList from '../presentational/UserList';
import { showDeleteDialog } from '../../actions';

const mapStateToProps = state => ({
  userList: state.userList,
});

const mapDispatchToProps = dispatch => ({
  onRemoveUsers: (rowsDeleted) => {
    dispatch(showDeleteDialog(rowsDeleted));
  },
});

const UserListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);

export default UserListContainer;
