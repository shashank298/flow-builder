import Node from "../../components/Node/Node";
import { MessageIcon } from "../../components/Svg/MessageIcon";
import "./styles.css";

const NodesList = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("node", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <section className="nodes-wrapper">
      <Node
        onDragStart={(event) => onDragStart(event, "message")}
        label={"message"}
        icon={<MessageIcon />}
      />
    </section>
  );
};

export default NodesList;
