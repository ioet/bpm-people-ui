import { connect } from 'react-redux';
import { editUpdateOrCreateUser, setUserEditData } from '../../actions';
import EditOrPlainText from '../presentational/EditOrPlainText';
import { getUserEditId, getInputError } from '../../selectors';

const mapStateToProps = (state, ownProps) => ({
  editId: getUserEditId(state),
  inputError: getInputError(state, ownProps.name),
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
