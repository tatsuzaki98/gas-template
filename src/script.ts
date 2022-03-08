interface State {
  passwordFormElement: null | HTMLElement;
  passwordInputElement: null | HTMLInputElement;
}
const state: State = {
  passwordFormElement: null,
  passwordInputElement: null,
};


window.onload = () => {
  state.passwordFormElement = document.getElementById('form-password');
  state.passwordInputElement = <HTMLInputElement>document.
      getElementById('input-password');
};


const handleSubmit = () => {
  document.cookie = [
    'jwt=pointer',
    'max-age=60*60*24*365',
    'samesite=strict',
    'secure',
  ].join('; ');

  return false;
};


// eslint-disable-next-line no-unused-vars
const HTML_HANDLERS = {
  handleSubmit,
};
