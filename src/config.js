import {
    MarkerType,
  } from "reactflow";

export const defaultEdgeOptions = {
    style: { strokeWidth: 2, stroke: "gray", visibility: "visible" },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "gray",
    },
  };
  
export const connectionLineStyle = { strokeWidth: 2, stroke: "gray" };

export const handlerStyle = { height: "8px", width: "8px", backgroundColor: "gray",}