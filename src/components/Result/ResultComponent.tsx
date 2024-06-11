
import React from 'react';

import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Styled components for Result component
const StyledCard = styled(Card)`
    background: #f2f3f6;
    padding: 15px;
`;

const ResultCard = styled(Card)`
    background: #fff;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

interface ResultProps {
    distance: number;
    endNode: string | null;
    startNode: string | null;
    traversedNodes: string[];
}

const Result: React.FC<ResultProps> = ({
    distance,
    endNode,
    startNode,
    traversedNodes,
}) => {
    return (
        <>
            <StyledCard>
                <Grid container spacing={2}>
                    {/* Total Steps */}
                    <Grid item xs={6}>
                        <Typography sx={{ color: '#1154a3', fontSize: '0.9rem' }}>
                            Total Steps
                        </Typography>
                        <Typography
                            sx={{ color: '#1154a3', fontWeight: 'bold', fontSize: '1.1rem' }}
                        >
                            {traversedNodes.length - 1}
                        </Typography>
                    </Grid>

                    {/* Total Distance */}
                    <Grid item textAlign='end' xs={6}>
                        <Typography sx={{ color: '#1154a3', fontSize: '0.9rem' }}>
                            Total Distance
                        </Typography>
                        <Typography
                            sx={{ color: '#1154a3', fontWeight: 'bold', fontSize: '1.1rem' }}
                        >
                            {distance}
                        </Typography>
                    </Grid>

                    {/* Path Information */}
                    <Grid item xs={12}>
                        <ResultCard>
                            {/* Path Start and End */}
                            <Typography sx={{ color: '#000', fontSize: '0.9rem' }}>
                                From {startNode} to {endNode}
                            </Typography>

                            {/* Traversed Nodes */}
                            <Typography sx={{ color: '#6e6f71', fontSize: '0.9rem' }}>
                                {traversedNodes.join(', ')}
                            </Typography>
                        </ResultCard>
                    </Grid>
                </Grid>
            </StyledCard>
        </>
    );
};

export default Result;
