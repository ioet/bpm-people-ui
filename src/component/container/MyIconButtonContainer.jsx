import { connect } from 'react-redux';
import { clearUser, editUpdateOrCreateUser, showDeleteDialog } from '../../actions';
import MyIconButton from '../presentational/MyIconButton';

const mapStateToProps = (state, ownProps) => ({
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  hover: state.hover.hover,
  hoverId: state.hover.id,
  user: ownProps.user,
  type: ownProps.type,
});

const mapDispatchToProps = dispatch => ({
  onUserEdit: (user) => {
    dispatch(editUpdateOrCreateUser(user));
  },
  onUserRemoved: (user, editId) => {
    if (user.id === editId) {
      dispatch(clearUser(user));
    } else {
      dispatch(showDeleteDialog(user));
    }
  },
});

const MyIconButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyIconButtonContainer;
