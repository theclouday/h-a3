import React from "react";
import DialogActionsMUI from "@mui/material/DialogActions";
import Button from "components/Button";

const DialogActions = ({ onClose, onConfirm }) => {
    return (
        <DialogActionsMUI>
            <Button 
                onClick={onClose}
            >
                Отмена
            </Button>
            <Button onClick={onConfirm} color="primary">
                Подтвердить
            </Button>
        </DialogActionsMUI>
    )
}

export default DialogActions;
