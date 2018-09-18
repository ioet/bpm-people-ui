/* eslint-disable no-undef */
import { connect } from 'react-redux';
import List from '../presentational/List';
import { handleErrors } from '../utils/Utils';

const getUsers = (dispatch) => {
  const url = 'http://localhost:3001/people';
  fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then((result) => {
      dispatch({
        type: 'ADD_USERS',
        user: result,
      });
      return result;
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
};

const mapStateToProps = state => ({
  userList: state.userList,
});

const mapDispatchToProps = (dispatch) => {
  getUsers(dispatch);
};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default ListContainer;
