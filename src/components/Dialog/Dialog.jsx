import React from 'react';
import DialogMui from '@mui/material/Dialog';

const maxWidthVariants = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
};

const Dialog = ({
  children,
  fullScreen = false,
  onClose,
  onConfirm,
  open,
  maxWidth = maxWidthVariants.sm,
}) => {
  return (
    <DialogMui
      fullScreen={fullScreen}
      fullWidth
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      maxWidth={maxWidth}
    >
      {children}
    </DialogMui>
  );
};

export default Dialog;
