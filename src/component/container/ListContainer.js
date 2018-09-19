/* eslint-disable no-undef,prefer-arrow-callback */
import { connect } from 'react-redux';
import List from '../presentational/List';
import { handleErrors, PEOPLE_API } from '../utils/Utils';

const getUsers = (dispatch) => {
  fetch(PEOPLE_API)
    .then(handleErrors)
    .then(res => res.json())
    .then((result) => {
      dispatch({
        type: 'ADD_USERS',
        user: result,
      });
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
  return {};
};

const mapStateToProps = state => ({
  userList: state.userList,
});

const mapDispatchToProps = dispatch => getUsers(dispatch);

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);

export default ListContainer;