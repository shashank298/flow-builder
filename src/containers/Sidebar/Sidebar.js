import NodeInput from "../NodeInput/NodeInput";
import NodesList from "../NodesList/NodesList";
import "./styles.css";

const Sidebar = ({ isEditing, node, handleBackClick, handleInputChange }) => {
  return (
    <section className="sidebar">
      {isEditing ? (
        <NodeInput
          node={node}
          handleBackClick={handleBackClick}
          handleInputChange={handleInputChange}
        />
      ) : (
        <NodesList />
      )}
    </section>
  );
};

export default Sidebar;
