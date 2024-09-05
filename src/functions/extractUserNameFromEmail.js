export const extractUserNameFromEmail = (email) => {
  if (email) {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
  }
  return '';
};
