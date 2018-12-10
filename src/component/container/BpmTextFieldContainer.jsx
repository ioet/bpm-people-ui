import { connect } from 'react-redux';
import { setUserEditData } from '../../actions';
import BpmTextField from '../presentational/BpmTextField';
import { getInputError } from '../../selectors';

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.name,
  label: ownProps.label,
  value: ownProps.value,
  error: getInputError(state, ownProps.name),
  helperText: ownProps.helperText,
  type: ownProps.type,
});

const mapDispatchToProps = dispatch => ({
  onChange: (event) => {
    dispatch(setUserEditData(event.target.name, event.target.value));
  },
});

const BpmTextFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BpmTextField);

export default BpmTextFieldContainer;
