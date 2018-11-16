import { connect } from 'react-redux';
import { startOrEndCreateUser } from '../../actions';
import FloatingActionButton from '../presentational/FloatingActionButton';
import { getFabIcon, getFabTooltip } from '../../selectors';

const mapStateToProps = state => ({
  tooltip: getFabTooltip(state),
  icon: getFabIcon(state),
});

const mapDispatchToProps = dispatch => ({
  createUser: () => {
    dispatch(startOrEndCreateUser());
  },
});

const FloatingActionButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatingActionButton);

export default FloatingActionButtonContainer;
