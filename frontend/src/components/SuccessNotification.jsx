const SuccessNotification = ({ message }) =>
  message === "" ? null : <div className="success">{message}</div>;

export default SuccessNotification;
