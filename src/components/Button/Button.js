import './styles.css';

function Button({label, placeholder="", onClick}) {
  return <button className="custom-button" placeholder={placeholder} onClick={onClick}>{label}</button>
}

export default Button;
