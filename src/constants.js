export const Variable = {
  NAME: 'name',
  AUTHENTICATION_IDENTITY: 'authentication_identity',
  PASSWORD: 'password',
  PASSWORD_CONFIRM: 'password_confirm',
};

export const ErrorMessage = {
  FAILED_TO_LOAD_USERS: 'Failed to load all saved persons.',
  FAILED_TO_CREATE_USER: 'Failed to create a new person.',
  FAILED_TO_UPDATE_USER: 'Failed to update the person.',
  FAILED_TO_REMOVE_USER: 'Failed to delete the person.',
  PASSWORDS_DO_NOT_MATCH: 'The passwords you entered do not match.',
  NO_PASSWORD_ENTERED: 'Please enter a password.',
  PASSWORD_NOT_STRONG_ENOUGH: 'Please use a stronger password',
};

export const NotificationMessage = {
  USER_CREATED_SUCCESSFULLY: ' was saved successfully.',
  CHANGES_DISCARDED: 'Your changes have been discarded.',
  CHANGES_UPDATED_SUCCESSFULLY: 'Your changes have been submitted successfully.',
  USER_DELETED_SUCCESSFULLY: ' has been deleted successfully.',
};

export const PromptMessage = {
  ENTER_VALID_NAME: 'Please enter a valid name.',
  ENTER_VALID_EMAIL: 'Please enter a valid email.',
};

export const AppConst = {
  APP_TITLE: 'Here are all users currently saved in our system',
};

export const ErrorSnackbarConst = {
  AUTO_HIDE_DURATION: 3000,
};

export const FooterConst = {
  LEARN_MORE: 'Learn more about bpm',
  BPM_GITHUB: 'https://github.com/ioet/',
};

export const UserListItemConst = {
  TOOLTIP_EDIT: 'Edit',
  TOOLTIP_SAVE: 'Save',
  TOOLTIP_DISCARD: 'Discard',
  TOOLTIP_DELETE: 'Delete',
  EDIT_NAME: 'Edit your name',
  EDIT_EMAIL: 'Edit your email',
};

export const UserListConst = {
  COLUMN_0: 'Id',
  COLUMN_1: 'Name',
  COLUMN_2: 'Email',
  COLUMN_3: 'Edit',
  COLUMN_4: 'Delete',
};

export const DeleteDialogConst = {
  TITLE: 'Delete user',
  CONTENT_TEXT_1: 'Do you really want to delete ',
  CONTENT_TEXT_2: ' permanently?',
  CONTENT_TEXT_MULTI_USER: ' users',
  DISAGREE: 'No',
  AGREE: 'Yes',
};

export const FloatingActionButtonConst = {
  TOOLTIP_ADD: 'Add new people',
  TOOLTIP_DISCARD: 'Discard',
};

export const TooltipConst = {
  ENTER_DELAY: 400,
  LEAVE_DELAY: 200,
};

export const PasswordDialogConst = {
  TITLE: 'Create a new password for your account',
  EXPLANATION: 'Please choose a strong password with some special characters!',
  PASSWORD: 'Enter a new password',
  CONFIRM_PASSWORD: 'Please confirm your password',
  CANCEL: 'Cancel',
  CREATE: 'Create',
};
