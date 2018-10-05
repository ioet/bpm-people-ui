/* eslint-disable camelcase,react/jsx-tag-spacing,react/forbid-prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { CreateUserConst } from '../../constants';
import { CreateUserStyles } from '../../styles';

const CreateUser = (props) => {
  const {
    classes, name, authentication_identity, createUser, onChange,
  } = props;
  return (
    <div className={classes.root}>
      <form onSubmit={(e) => {
        e.preventDefault();
        createUser();
      }}
      >
        <TextField
          name="name"
          value={name}
          className={classes.margin}
          label={CreateUserConst.ENTER_NAME}
          id="mui-theme-provider-input"
          onChange={
            (e) => {
              e.preventDefault();
              onChange(e);
            }
          }
        />
        <TextField
          name="authentication_identity"
          value={authentication_identity}
          className={classes.margin}
          label={CreateUserConst.ENTER_EMAIL}
          id="mui-theme-provider-input"
          onChange={
            (e) => {
              e.preventDefault();
              onChange(e);
            }
          }
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          {CreateUserConst.CREATE}
        </Button>
      </form>
    </div>
  );
};

CreateUser.defaultProps = {
  name: '',
  authentication_identity: '',
};

CreateUser.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  authentication_identity: PropTypes.string,
  createUser: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(CreateUserStyles)(CreateUser);
