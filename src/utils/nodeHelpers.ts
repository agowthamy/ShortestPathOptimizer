import { GraphNode } from '../types/GraphTypes';

export const getNodeBorderWidth = (node: GraphNode, startNode: string | null, endNode: string | null): number => {
  if (node.id === startNode || node.id === endNode) {
    return 5; // Thicker border for start and end nodes
  } return node.borderWidth;
};

export const getNodeTitle = (node: GraphNode, startNode: string | null, endNode: string | null): string => {
  if (node.id === startNode) {
    return `<div style="background: '#DA753C'" >Start</div>`; // Additional text to be displayed in the tooltip
  } else if (node.id === endNode) {
    return `<div style="background: '#DA753C'" >End</div>`;
  } else {
    return "";
  }
};

export const getNodeColor = (node: GraphNode, startNode: string | null, endNode: string | null): { background: string; border: string } => {
  if (node.id === startNode || node.id === endNode) {
    return { background: '#DA753C', border: '#F4D6C5' };
  } 
  return node.color;
};
