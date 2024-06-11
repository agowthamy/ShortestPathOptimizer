import axios from 'axios';
import { CustomNode } from '../types/Node';

const CalculationService = async (
	startNode: string,
	endNode: string,
	nodes: CustomNode[],
) => {
	const url = 'http://localhost:5004/api/shortestpath';

	const bodyData = {
		fromNode: startNode,
		toNode: endNode,
		graphNodes: nodes,
	};

	try {
		const response = await axios.post(url, JSON.stringify(bodyData), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response) {
			throw new Error('Failed to fetch data');
		}
		const data = await response.data;
		return data;
	} catch (error) {
		throw new Error('An error occurred while calculating shortest path');
	}
};

export default CalculationService;
