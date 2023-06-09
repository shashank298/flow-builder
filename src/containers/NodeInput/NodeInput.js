import { useState, useEffect } from "react";
import "./styles.css"

const NodeInput = ({ node, handleBackClick, handleInputChange }) => {
  const [input, setInput] = useState(node?.data);
  const onInputChange = (e) => {
    setInput(e.target.value);
    handleInputChange(e, node?.id);
  };

  useEffect(() => {
      setInput(node?.data);
  }, [node?.id]);

  return (
    <>
      <header className="input-header">
        <button className="back-icon" onClick={handleBackClick}>
          &#8592;
        </button>
        {node?.type}
      </header>
      <div className="input-container">
        <label className="input-label" htmlFor="message">
          Text
        </label>
        <textarea
          value={input}
          rows="6"
          cols="10"
          type="text"
          id="message"
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default NodeInput;
