import React from 'react';
import { connect } from 'react-redux';
import { handleCloseCreateUserDialog } from '../../actions';
import BpmDialog from '../presentational/BpmDialog';
import { CreateUserDialogConst } from '../../constants';
import EditableFieldsContainer from './EditableFieldsContainer';
import PasswordFieldsContainer from './PasswordFieldsContainer';
import { isUserCreateActive } from '../../selectors';

const getChildren = () => (
  <div>
    <EditableFieldsContainer
      nameLabel={CreateUserDialogConst.NAME_LABEL}
      authenticationIdentityLabel={CreateUserDialogConst.AUTHENTICATION_IDENTITY_LABEL}
    />
    <PasswordFieldsContainer />
  </div>
);

const mapStateToProps = state => ({
  open: isUserCreateActive(state),
  children: getChildren(),
  dialogTitle: CreateUserDialogConst.TITLE,
  positiveButtonLabel: CreateUserDialogConst.CREATE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseCreateUserDialog(confirmed));
  },
});

const CreateUserDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmDialog);

export default CreateUserDialogContainer;
