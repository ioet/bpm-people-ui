import { connect } from 'react-redux';
import { hoverOut, hoverOver } from '../../actions';
import BpmTableCell from '../presentational/BpmTableCell';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onMouseOver: () => {
    dispatch(hoverOver(ownProps.userId));
  },
  onMouseOut: () => {
    dispatch(hoverOut());
  },
});

const BpmTableCellContainer = connect(
  null,
  mapDispatchToProps,
)(BpmTableCell);

export default BpmTableCellContainer;
