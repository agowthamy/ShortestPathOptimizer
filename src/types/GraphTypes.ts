export interface GraphNode {
	id: string;
	label: string;
	color: {
		background: string;
		border: string;
	};
	borderWidth: number;
	title?: string;
}

export interface GraphEdge {
	id: string | number;
	label: string;
	from: string;
	to: string;
}

export interface GraphData {
	nodes: GraphNode[];
	edges: GraphEdge[];
}
