export const graphOptions = {
  interaction: { hover: true },
      layout: {
    improvedLayout: true // Improved layout for non-hierarchical graph
  },
  physics: {
    enabled: false // Disable physics to keep nodes fixed
  },
  nodes: {
    fixed: true,
    size: 30,
    font: {
      size: 32,
      color: '#000'
    }
  },
  edges: {
    color: '#256ABD',
    width: 2,
    font: {
      size: 25, // Adjust the size of the edge labels
      color: '#DA753C',
      align: 'horizontal',
      fontWeight: 300
    },
  },
  height: "100%"
};