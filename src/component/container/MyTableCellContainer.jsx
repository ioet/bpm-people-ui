import { connect } from 'react-redux';
import { hoverOut, hoverOver } from '../../actions';
import MyTableCell from '../presentational/MyTableCell';

const mapStateToProps = (state, ownProps) => ({
  user: ownProps.user,
});

const mapDispatchToProps = dispatch => ({
  onMouseOver: (id) => {
    dispatch(hoverOver(id));
  },
  onMouseOut: () => {
    dispatch(hoverOut());
  },
});

const MyTableCellContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyTableCell);

export default MyTableCellContainer;
