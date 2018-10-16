import { connect } from 'react-redux';
import { clearUser, editUpdateOrCreateUser, showDeleteDialog } from '../../actions';
import MyIconButton from '../presentational/MyIconButton';

const mapStateToProps = (state, ownProps) => ({
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  hover: state.hover.hover,
  hoverId: state.hover.id,
  userId: ownProps.user.id,
  type: ownProps.type,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUserEdit: () => {
    dispatch(editUpdateOrCreateUser(ownProps.user));
  },
  onUserRemoved: (editId) => {
    if (ownProps.user.id === editId) {
      dispatch(clearUser(ownProps.user));
    } else {
      dispatch(showDeleteDialog(ownProps.user));
    }
  },
});

const MyIconButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyIconButtonContainer;
