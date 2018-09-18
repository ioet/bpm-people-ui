/* eslint-disable no-undef */
import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';

function handleErrors(response) {
  if (!response.ok) {
    alert(response.statusText);
    throw Error(response.statusText);
  }
  return response;
}

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
});

const mapDispatchToProps = dispatch => ({
  onUserUpdated: (user) => {
    // TODO create PUT method in API

    // update user per api

    // let url = 'http://localhost:3001/people/' + guid;
    // fetch(url, {
    //     method: 'put',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         name: user.display_name,
    //         authentication_identity: user.authentication_identity
    //     })
    // })
    //     .then(handleErrors)
    //     .then(() => this.props.onUserUpdated(user))
    //     .catch(function (error) {
    //         alert(error);
    //         console.log(error);
    //     });

    dispatch({
      type: 'UPDATE_USER',
      user,
    });
  },
  onUserRemoved: (user) => {
    // delete user per api
    const url = `http://localhost:3001/people/${user.guid}`;
    fetch(url, {
      method: 'delete',
    })
      .then(handleErrors)
      .then(() => {
        // on success remove user from state
        dispatch({
          type: 'REMOVE_USER',
          user,
        });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  },
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default ListItemContainer;
