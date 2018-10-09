import { connect } from 'react-redux';
import ListItem from '../presentational/ListItem';
import { editUpdateOrCreateUser, removeOrClearUser, setUserEditData } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  inputError: state.inputError,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (user) => {
    dispatch(editUpdateOrCreateUser(user));
  },
  onChange: (event) => {
    dispatch(setUserEditData(event.target.name, event.target.value));
  },
  onUserRemoved: (user) => {
    dispatch(removeOrClearUser(user));
  },
});

const ListItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListItem);

export default ListItemContainer;
