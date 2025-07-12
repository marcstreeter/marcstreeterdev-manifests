import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import ExampleIcon from '../../assets/icons/example-icon.svg';

export interface ExampleComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  showIcon?: boolean;
}

export const ExampleComponent: React.FC<ExampleComponentProps> = ({
  title,
  description,
  onAction,
  variant = 'primary',
  disabled = false,
  showIcon = false,
}) => {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderColor: 'grey.300',
        borderRadius: 1,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        {showIcon && (
          <Avatar 
            src={ExampleIcon} 
            alt="Example Icon"
            sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
          />
        )}
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>
      
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      
      {onAction && (
        <Button
          variant={variant}
          onClick={onAction}
          disabled={disabled}
          size="small"
        >
          {disabled ? 'Disabled' : 'Take Action'}
        </Button>
      )}
    </Box>
  );
}; 