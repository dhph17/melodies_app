import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  textAlign: 'center',
};

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="login-modal-title" variant="h6" component="h2" gutterBottom>
          You are not logged in
        </Typography>
        <Typography id="login-modal-description" sx={{ mb: 2 }}>
          Please log in to access this feature.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClose} 
          sx={{ mt: 2, borderRadius: 2 }}
        >
          Login Here
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
