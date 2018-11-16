import { connect } from 'react-redux';
import MyIconButton from '../presentational/MyIconButton';
import { editUpdateOrCreateUser } from '../../actions';
import {
  getEditButtonIcon, getEditButtonTooltip, getHoverId, isHoverActive,
} from '../../selectors';

const mapStateToProps = (state, ownProps) => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: getEditButtonIcon(state, ownProps),
  tooltip: getEditButtonTooltip(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(editUpdateOrCreateUser(ownProps.userId));
  },
});

const MyEditButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyEditButtonContainer;
