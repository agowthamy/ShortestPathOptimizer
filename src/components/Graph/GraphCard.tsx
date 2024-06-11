import React, { useEffect, useState } from 'react';
import GraphVisualization from './GraphVisualization';
import {
	Alert,
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import { styled } from '@mui/system';

import graphData from '../../data/GraphData.json';
import { transformGraphNode } from '../../utils/transformGraphNode';
import CalculationService from '../../services/calculationService';
import Result from '../Result/ResultComponent';
import { GraphData } from '../../types/GraphTypes';

// Styled components for the card and buttons
const StyledCard = styled(Card)`
	border-radius: 10px;
	min-width: 275px;
	width: 100%;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
	background: #fff;
	height: auto;
	min-height: 100px;
	padding: 10px;
`;

const StyledButton = styled(Button)`
	color: ${(props) => (props.variant === 'outlined' ? '#DA753C' : '#fff')};
	background-color: ${(props) =>
		props.variant === 'outlined' ? 'transparent' : '#DA753C'};
	border: 1px solid #da753c;
	&:hover {
		background-color: ${(props) =>
			props.variant === 'outlined' ? '#DA753C' : '#B6B7B9'};
		border: 1px solid #da753c;
	}
`;

const GraphCard: React.FC = () => {
	const [graphNodeData, setGraphNodeData] = useState<GraphData>(graphData);
	const [startNode, setStartNode] = useState<string | null>(null);
	const [endNode, setEndNode] = useState<string | null>(null);
	const [traversedNodes, setTraversedNode] = useState<string[]>([]);
	const [distance, setDistance] = useState(0);
	const [error, setError] = useState(false);

	// Determine if the Result component should be displayed
	const shouldShowResultComponent =
		distance !== 0 && traversedNodes.length !== 0;

	// Update node colors when the distance or traversedNodes change
	useEffect(() => {
		updateNodeColors();
	}, [distance, traversedNodes]);

	// Function to update node colors based on traversedNodes
	const updateNodeColors = () => {
		const updatedNodes = graphNodeData.nodes.map((node) => ({
			...node,
			color: traversedNodes.includes(node.id)
				? { background: '#DA753C', border: '#F4D6C5' }
				: { background: '#256ABD', border: '#256ABD' },
			borderWidth: traversedNodes.includes(node.id) ? 5 : 1,
		}));

		setGraphNodeData((prev) => ({
			...prev,
			nodes: updatedNodes,
		}));
	};

	// Handle calculate button click
	const handleCalculate = async () => {
		const transformedGraphNodes = transformGraphNode(graphData);

		try {
			if (startNode && endNode) {
				const data = await CalculationService(
					startNode,
					endNode,
					transformedGraphNodes,
				);
				setDistance(data.distance);
				setTraversedNode(data.nodeNames);
			}
		} catch (error) {
			setError(true);
		}
	};

	// Handle reset button click
	const handleReset = () => {
		setStartNode(null);
		setEndNode(null);
		setTraversedNode([]);
		setDistance(0);
		setGraphNodeData(graphData);
	};

	const handleSBClose = () => {
		setError(false);
		handleReset();
	};

	return (
		<>
			<Grid container justifyContent='center'>
				<StyledCard>
					<CardContent>
						{/* Header */}
						<Typography
							sx={{ fontSize: 20, color: '#256ABD', fontWeight: 'bold' }}
						>
							Select Path
						</Typography>
						<Typography
							sx={{ fontSize: 15, color: '#3b3c3f', marginTop: '5px' }}
						>
							Click on the Nodes to select the path
						</Typography>

						{/* Graph Visualization */}
						<Grid sx={{ height: 280 }}>
							<GraphVisualization
								onSetStartNode={setStartNode}
								onSetEndNode={setEndNode}
								startNode={startNode}
								endNode={endNode}
								graphNodeData={graphNodeData}
							/>
						</Grid>

						{/* Result Component */}
						<Grid>
							{shouldShowResultComponent && (
								<Result
									startNode={startNode}
									endNode={endNode}
									distance={distance}
									traversedNodes={traversedNodes}
								/>
							)}
						</Grid>
					</CardContent>

					{/* Card Actions */}
					<CardActions
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginRight: '10px',
						}}
					>
						{/* Button Stack */}
						<Stack spacing={2} direction='row'>
							{/* Reset/Clear Button */}
							<StyledButton onClick={handleReset} variant='outlined'>
								{shouldShowResultComponent ? 'Restart' : 'Clear'}
							</StyledButton>

							{/* Calculate Button */}
							{!shouldShowResultComponent && (
								<StyledButton
									disabled={!startNode || !endNode}
									onClick={handleCalculate}
									variant='contained'
								>
									Calculate
									<span style={{ marginLeft: 5 }}>
										<i className='fa fa-calculator' aria-hidden='true'></i>{' '}
									</span>
								</StyledButton>
							)}
						</Stack>
					</CardActions>
				</StyledCard>
			</Grid>
			{error && (
				<Snackbar open autoHideDuration={3000} onClose={handleSBClose}>
					<Alert severity='error'>
						<div
							style={{
								display: 'flex',
								flexFlow: 'column',
								alignItems: 'center',
							}}
						>
							Please select different nodes
						</div>
					</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default GraphCard;
