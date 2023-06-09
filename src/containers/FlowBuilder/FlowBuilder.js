import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";
import "./styles.css";
import MessageNode from "../../components/CustomNodes/MessageNode";
import { connectionLineStyle, defaultEdgeOptions } from "../../config";
import Sidebar from "../Sidebar/Sidebar";
import Button from "../../components/Button/Button";

const nodeTypes = {
  message: MessageNode,
};

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);

  // Function to add edges
  const onEdgeConnect = useCallback((params) => {
    const { source, target } = params;

    // Cannot have same source & target
    if (source === target) return;

    // Should have only one edge from source
    const currSources = new Set([]);
    edges.forEach((edge) => currSources.add(edge.source))
    if (currSources.has(source)) return;

    setEdges((edges) => addEdge(params, edges));
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  // Creating a node on drop event
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = e.dataTransfer.getData("node");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: e.clientX - reactFlowBounds.left,
        y: e.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: "Text message",
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onNodeClick = (_e, node) => {
    setEditing(true);
    setCurrentNode(node);
  };

  const handleBackClick = () => {
    setEditing(false);
    setCurrentNode(null);
  };

  // This is for handling the input change
  const handleInputChange = (e, nodeId) => {
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data: e.target.value };
      }
      return node;
    });
    setNodes(updatedNodes);
  };

  const handleSave = () => {
    // check for total number of source & targets in edges & total number of nodes
    // we cannot save if they are of different length
    const totalMappedNodes = new Set([]);
    edges.forEach((edge) => {
      totalMappedNodes.add(edge.source);
      totalMappedNodes.add(edge.target);
    });

    if (totalMappedNodes.size !== nodes.length) {
      alert("Cannot Save The Flow !!");
    }
  };

  return (
    <>
      <header className="header">
        <Button label="save changes" onClick={handleSave} />
      </header>
      <section className="content">
        <ReactFlowProvider>
          <section className="full-height left-panel">
            <div className="react-flow-wrapper" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onNodeClick={onNodeClick}
                onEdgesChange={onEdgesChange}
                onConnect={onEdgeConnect}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineStyle={connectionLineStyle}
              >
                <Controls />
                <Background color="#aaa" gap={24} />
              </ReactFlow>
            </div>
          </section>
          <section className="full-height right-panel">
            <Sidebar
              isEditing={editing}
              node={currentNode}
              handleBackClick={handleBackClick}
              handleInputChange={handleInputChange}
            />
          </section>
        </ReactFlowProvider>
      </section>
    </>
  );
};

export default FlowBuilder;
