import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper,
  Button,
  Alert
} from '@mui/material';
import { ExampleComponent } from '../../components/ExampleComponent';

export const ExamplePage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleAction = () => {
    setCounter(prev => prev + 1);
    setShowAlert(true);
    
    // Hide alert after 3 seconds
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Example Page
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This is an example page demonstrating how to structure page-level components.
      </Typography>

      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Action completed! Counter is now {counter}.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Interactive Component
            </Typography>
            <ExampleComponent
              title="Click Counter"
              description="This component demonstrates interactivity with state management."
              onAction={handleAction}
              variant="primary"
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Clicks: {counter}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Static Component
            </Typography>
            <ExampleComponent
              title="Information Card"
              description="This is a static component without any actions."
              variant="secondary"
            />
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          onClick={() => setCounter(0)}
          disabled={counter === 0}
        >
          Reset Counter
        </Button>
      </Box>
    </Container>
  );
}; 