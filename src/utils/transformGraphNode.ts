import { GraphData } from "../types/GraphTypes";
import { CustomNode } from "../types/Node";

export const transformGraphNode = (data: GraphData): CustomNode[] => {
  const transformedNodes: CustomNode[]= data.nodes.map(node => {
    const edges: { [key: string]: number } = {};
    data.edges.forEach(edge => {
      if (edge.from === node.id) {
        edges[edge.to] = parseInt(edge.label);
      }
    });

    return {
      name: node.id,
      edges
    };
  }).filter(node => Object.keys(node.edges).length !== 0) as CustomNode[]; ;

  return transformedNodes;
}
