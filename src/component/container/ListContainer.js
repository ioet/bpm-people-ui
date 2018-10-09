/* eslint-disable react/jsx-tag-spacing */
import { connect } from 'react-redux';
import React from 'react';
import List from '../presentational/List';
import ListItemContainer from './ListItemContainer';

const mapStateToProps = (state) => {
  const { userList } = state;

  const users = userList.map(user => (
    <ListItemContainer key={user.id} user={user}/>
  ));

  return {
    users,
  };
};

const ListContainer = connect(
  mapStateToProps,
)(List);

export default ListContainer;
