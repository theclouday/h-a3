import { useState } from "react";
import { BASE_API_LINK } from "../constants/url";
import Dialog from "components/Dialog";
import Button from "components/Button";

export function DeleteBook(id) {
  return fetch(BASE_API_LINK+{id}, {
    method: 'DELETE',
  });
}

function ProceedDeleteBooks ({book, onDelete}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
     setOpen(false);
  };
  
  const handleDelete = () => {
    onDelete(book.id);
    handleClose();
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.yearOfIssue}</p>
      <Button onClick={handleClickOpen}>
        <Button>delete</Button>
      </Button>
      <Dialog 
        open={open}
        onClose={handleClose}
        onConfirm={handleDelete}
        >
          Ви впевнені, що хочете видалити цю книгу? Цю дію не можна скасувати.
        </Dialog>
    </div>
  );
}

export default ProceedDeleteBooks;