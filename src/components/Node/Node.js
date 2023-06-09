import "./styles.css";

const Node = ({ icon, label, onDragStart }) => {
  return (
    <div className="node-wrapper" onDragStart={onDragStart} draggable>
      <div>{icon}</div>
      <h4 className="node-label">{label}</h4>
      
    </div>
  );
};

export default Node;
