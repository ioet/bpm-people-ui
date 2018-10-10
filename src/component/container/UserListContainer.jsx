/* eslint-disable react/jsx-tag-spacing */
import { connect } from 'react-redux';
import UserList from '../presentational/UserList';

const mapStateToProps = state => ({
  userList: state.userList,
});

const UserListContainer = connect(
  mapStateToProps,
)(UserList);

export default UserListContainer;
