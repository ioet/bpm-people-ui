import React from 'react';
import PropTypes from 'prop-types';
import { Variable } from '../../constants';
import BpmTextFieldContainer from '../container/BpmTextFieldContainer';

const EditableFields = (props) => {
  const {
    name, nameLabel, authentication_identity, authenticationIdentityLabel,
  } = props;

  return (
    <div>
      <BpmTextFieldContainer
        autoFocus
        name={Variable.NAME}
        label={nameLabel}
        value={name}
      />
      <BpmTextFieldContainer
        name={Variable.AUTHENTICATION_IDENTITY}
        label={authenticationIdentityLabel}
        value={authentication_identity}
      />
    </div>
  );
};

EditableFields.defaultProps = {
  name: '',
  authentication_identity: '',
};

EditableFields.propTypes = {
  name: PropTypes.string,
  nameLabel: PropTypes.string.isRequired,
  authentication_identity: PropTypes.string,
  authenticationIdentityLabel: PropTypes.string.isRequired,
};

export default EditableFields;
