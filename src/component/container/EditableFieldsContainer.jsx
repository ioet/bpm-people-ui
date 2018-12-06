import { connect } from 'react-redux';
import { getUserEditAuthenticationIdentity, getUserEditName } from '../../selectors';
import EditableFields from '../presentational/EditableFields';

const mapStateToProps = (state, ownProps) => ({
  name: getUserEditName(state),
  nameLabel: ownProps.nameLabel,
  authentication_identity: getUserEditAuthenticationIdentity(state),
  authenticationIdentityLabel: ownProps.authenticationIdentityLabel,
});

const EditableFieldsContainer = connect(
  mapStateToProps,
  null,
)(EditableFields);

export default EditableFieldsContainer;
