import React from 'react';
import { connect } from 'react-redux';
import MyDialog from '../presentational/MyDialog';
import { isUserEditActive } from '../../selectors';
import { EditUserDialogConst } from '../../constants';
import { handleCloseEditUserDialog } from '../../actions';
import EditableFieldsContainer from './EditableFieldsContainer';

const getChildren = () => (
  <div>
    <EditableFieldsContainer
      nameLabel={EditUserDialogConst.NAME_LABEL}
      authenticationIdentityLabel={EditUserDialogConst.AUTHENTICATION_IDENTITY_LABEL}
    />
  </div>
);

const mapStateToProps = state => ({
  open: isUserEditActive(state),
  dialogTitle: EditUserDialogConst.TITLE,
  children: getChildren(),
  positiveButtonLabel: EditUserDialogConst.UPDATE,
});

const mapDispatchToProps = dispatch => ({
  handleClose: (confirmed) => {
    dispatch(handleCloseEditUserDialog(confirmed));
  },
});

const EditUserDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyDialog);

export default EditUserDialogContainer;
