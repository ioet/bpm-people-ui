/* eslint-disable no-undef,prefer-arrow-callback */
import { connect } from 'react-redux';
import List from '../presentational/List';

const mapStateToProps = state => ({
  userList: state.userList,
});

const ListContainer = connect(
  mapStateToProps,
)(List);

export default ListContainer;
