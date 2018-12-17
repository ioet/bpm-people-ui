import { connect } from 'react-redux';
import { startCreateUser } from '../../actions';
import BpmButton from '../presentational/BpmButton';
import { NewPersonButtonConst } from '../../constants';

const mapStateToProps = () => ({
  buttonLabel: NewPersonButtonConst.ADD_NEW_PERSON,
});

const mapDispatchToProps = dispatch => ({
  buttonAction: () => {
    dispatch(startCreateUser());
  },
});

const NewPersonButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmButton);

export default NewPersonButtonContainer;
