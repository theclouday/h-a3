import React from "react";
import SnackbarMUI from "@mui/material/Snackbar";

const Snackbar = ({ open, handleClose, message }) => {
    return (
        <SnackbarMUI
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            message={message}
        />
    );
};

export default Snackbar;
