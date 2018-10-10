import { connect } from 'react-redux';
import ListItem from '../presentational/UserListItem';
import {
  clearUser, editUpdateOrCreateUser, hoverOut, hoverOver, setUserEditData, showDeleteDialog,
} from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  inputError: state.inputError,
  hover: state.hover.hover,
  hoverId: state.hover.id,
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
  onMouseOver: (id) => {
    dispatch(hoverOver(id));
  },
  onMouseOut: () => {
    dispatch(hoverOut());
  },
});

const UserListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default UserListItemContainer;
