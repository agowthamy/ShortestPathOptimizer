import { useState } from 'react';
import { GraphNode } from '../types/GraphTypes';
import { getNodeTitle } from '../utils/nodeHelpers';

interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

const useGraphHover = (containerRef: React.RefObject<HTMLDivElement>,graphData: { nodes: GraphNode[] }, startNode: string | null, endNode: string | null) => {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, content: '', x: 0, y: 0 });

const handleHoverNode = (event: any) => {
		const nodeId = event.node;
		const node = graphData.nodes.find(node => node.id === nodeId);
		if (node) {
			const containerRect = containerRef.current?.getBoundingClientRect();
			if (containerRect) {
				setTooltip({
					visible: nodeId === startNode || nodeId === endNode,
					content: getNodeTitle(node, startNode, endNode),
					x: event.event.clientX - containerRect.left,
					y: event.event.clientY - containerRect.top
				});
			}
		}
	};

  const handleBlurNode = () => {
    setTooltip({ visible: false, content: '', x: 0, y: 0 });
  };

  return { tooltip, handleHoverNode, handleBlurNode };
};

export default useGraphHover;
