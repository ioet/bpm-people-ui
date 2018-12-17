import React from 'react';
import Typography from '@material-ui/core/Typography/Typography';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import UserListContainer from './component/container/UserListContainer';
import ErrorSnackbarContainer from './component/container/ErrorSnackbarContainer';
import Footer from './component/presentational/Footer';
import { AppConst } from './constants';
import NewPersonButtonContainer from './component/container/NewPersonButtonContainer';
import DeleteDialogContainer from './component/container/DeleteDialogContainer';
import CreateUserDialogContainer from './component/container/CreateUserDialogContainer';
import EditUserDialogContainer from './component/container/EditUserDialogContainer';

function App() {
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {AppConst.APP_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <UserListContainer />
      <Footer />
      <NewPersonButtonContainer />
      <ErrorSnackbarContainer />
      <DeleteDialogContainer />
      <CreateUserDialogContainer />
      <EditUserDialogContainer />
    </div>
  );
}

export default App;
