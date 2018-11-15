import { connect } from 'react-redux';
import MyIconButton from '../presentational/MyIconButton';
import { clearOrShowDelete } from '../../actions';
import {
  getDeleteButtonIcon, getDeleteButtonTooltip, getHoverId, isHoverActive,
} from '../../selectors';

const mapStateToProps = (state, ownProps) => ({
  hover: isHoverActive(state),
  hoverId: getHoverId(state),
  icon: getDeleteButtonIcon(state, ownProps),
  tooltip: getDeleteButtonTooltip(state, ownProps),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClickCallback: () => {
    dispatch(clearOrShowDelete([ownProps.userId]));
  },
});

const MyDeleteButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyIconButton);

export default MyDeleteButtonContainer;
