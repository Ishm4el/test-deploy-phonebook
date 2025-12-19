const ErrorNotification = ({ message }) =>
  message === "" ? null : <div className="error">{message}</div>;

export default ErrorNotification;
