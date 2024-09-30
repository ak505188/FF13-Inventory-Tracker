import './Button.scss';

const Button = (props) => {
  const { className, onClick, children } = props;
  return (
    <button
      className={`btn${className ? (' ' + className) : ''}`}
      onClick={onClick}
    >{children}
    </button>
  );
}

export default Button
