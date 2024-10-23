import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function SimpleAlert() {
  console.log('SimpleAlert renderizado'); 
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="✔️ Success"
      style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000, backgroundColor: 'green', color: 'white' }}
    >
      Successful.
    </Alert>
  );
}
