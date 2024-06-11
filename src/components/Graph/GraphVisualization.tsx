import React, { useEffect, useRef, useState } from 'react';

//@ts-ignore
import Graph from 'react-graph-vis';

import { styled } from '@mui/system';

import { graphOptions } from '../../constants/graphOptions';
import useGraphHover from '../../hooks/useGraphHover';
import { GraphData } from '../../types/GraphTypes';
import {
	getNodeTitle,
	getNodeBorderWidth,
	getNodeColor,
} from '../../utils/nodeHelpers';

const GraphContainer = styled('div')({
	position: 'relative',
	height: '300px',
	width: '100%',
});

const CustomTooltip = styled('div')(() => ({
	position: 'absolute',
	backgroundColor: '#DA753C',
	color: '#fff',
	padding: '2px 6px',
	borderRadius: '10px',
	zIndex: 1000,
	pointerEvents: 'none',
}));

interface GraphVisualizationProps {
	graphNodeData: GraphData;
	startNode: string | null;
	endNode: string | null;
	onSetStartNode: (nodeId: string | null) => void;
	onSetEndNode: (nodeId: string | null) => void;
}

const GraphVisualization: React.FC<GraphVisualizationProps> = (props) => {
	const {
	graphNodeData,
	startNode,
	endNode,
	onSetStartNode,
	onSetEndNode,
} = props;
	const [graphData, setGraphData] = useState(graphNodeData);

	// Ref to the container div for handling tooltip positioning
	const containerRef = useRef<HTMLDivElement>(null);

	 // Custom hook for handling hover effects and tooltip display
	const { tooltip, handleHoverNode, handleBlurNode } = useGraphHover(
		containerRef,
		graphData,
		startNode,
		endNode,
	);

	useEffect(() => {
		updateNodeColors();
	}, [startNode, endNode]);

	useEffect(() => {
		setGraphData(graphNodeData);
	}, [graphNodeData]);

	const handleNodeSelect = (event: any) => {
		const nodeId = event.nodes[0];

		if (nodeId === startNode || nodeId === endNode) {
			return; // If reselecting the same node, do nothing
		}

		if (!startNode) {
			onSetStartNode(nodeId);
		} else if (!endNode && nodeId !== startNode) {
			onSetEndNode(nodeId);
		} else {
			onSetStartNode(nodeId);
			onSetEndNode(null);
		}
	};

	// Update node colors, border widths, and titles
	const updateNodeColors = () => {
		const updatedNodes = graphData.nodes.map((node) => ({
			...node,
			color: getNodeColor(node, startNode, endNode),
			borderWidth: getNodeBorderWidth(node, startNode, endNode),
			title: getNodeTitle(node, startNode, endNode),
		}));

		setGraphData((prev) => ({
			...prev,
			nodes: updatedNodes,
		}));
	};

	return (
		<div ref={containerRef}>
			<GraphContainer>
				<Graph
					graph={graphData}
					options={graphOptions}
					events={{
						selectNode: handleNodeSelect,
						hoverNode: handleHoverNode,
						blurNode: handleBlurNode,
					}}
				/>
			</GraphContainer>
			{tooltip.visible && (
				<CustomTooltip
					style={{ top: tooltip.y, left: tooltip.x }}
					dangerouslySetInnerHTML={{ __html: tooltip.content }}
				/>
			)}
		</div>
	);
};

export default GraphVisualization;
