import { connect } from 'react-redux';
import { editUpdateOrCreateUser, setUserEditData } from '../../actions';
import EditOrPlainText from '../presentational/EditOrPlainText';

const mapStateToProps = (state, ownProps) => ({
  editId: (typeof state.userEdit.id === 'undefined') ? '' : state.userEdit.id,
  inputError: state.inputError[ownProps.name],
  userId: ownProps.userId,
  value: ownProps.value,
  name: ownProps.name,
  label: ownProps.label,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUserEdit: () => {
    dispatch(editUpdateOrCreateUser(ownProps.userId));
  },
  onChange: (event) => {
    dispatch(setUserEditData(event.target.name, event.target.value));
  },
});

const EditOrPlainTextContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditOrPlainText);

export default EditOrPlainTextContainer;
