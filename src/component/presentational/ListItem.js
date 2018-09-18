import React from 'react';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';

const pointerButtonStyle = {
  cursor: 'pointer',
  padding: '7px',
  textAlign: 'center',
  fontSize: '1.3rem',
};

class ListItem extends React.Component {
  render() {
    // save the user data passed as props so that we can display it right away
    this.display_name = this.props.user.display_name;
    this.authentication_identity = this.props.user.authentication_identity;

    return (
      <TableRow>
        <TableCell component="th" scope="row">
          {this.display_name}
          {/*<input name="display_name" type="text"*/}
          {/*defaultValue={this.display_name}*/}
          {/*ref={node => {*/}
          {/*this.display_name = node;*/}
          {/*}}/>*/}
        </TableCell>
        <TableCell>
          {this.authentication_identity}
          {/*<input name="authentication_identity" type="text"*/}
          {/*defaultValue={this.authentication_identity}*/}
          {/*ref={node => {*/}
          {/*this.authentication_identity = node;*/}
          {/*}}/>*/}
        </TableCell>
        <TableCell
          numeric
          style={pointerButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            this.props.onUserUpdated(this.props.user);
          }}
        >
          {/* pencil icon */}
          &#x270E;
          {/* check mark */}
          {/*&#10004;*/}
        </TableCell>
        <TableCell
          numeric
          style={pointerButtonStyle}
          onClick={(e) => {
            e.preventDefault();
            this.props.onUserRemoved(this.props.user);
          }}
        >
          &times;
        </TableCell>
      </TableRow>
    );
  }
}

export default ListItem;
