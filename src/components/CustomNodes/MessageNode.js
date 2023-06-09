import "./styles.css";
import { MessageIcon } from "../Svg/MessageIcon";
import { memo } from "react";
import { Handle, Position } from "reactflow";
import 'reactflow/dist/style.css';
import { handlerStyle } from "../../config";

const MessageNode = ({ id, data, isConnectable }) => {
  return (
    <article className="message-node-wrapper">
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
        style={{...handlerStyle, left:"-3px"}}
      />
      <header className="message-node-header">
        <MessageIcon height="15" width="15" />
        Send message
      </header>
      <section className="message-node-body">{data}</section>
      <Handle
        type="source"
        position={Position.Right}
        style={{...handlerStyle, right:"-3px"}}
        isConnectable={isConnectable}
      />
    </article>
  );
};

export default memo(MessageNode);
