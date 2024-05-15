import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_API_LINK } from 'constants/apiURL';
import Button from 'components/Button';
import EditIcon from './EditIcon';
import CardContent from 'components/CardContent';
import Snackbar from 'components/Snackbar';



function RenderDetails() {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(id === 'new');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errorInput, setErrorInput] = useState({});
    

    useEffect(() => {
        if (id !== 'new') {
            fetch(BASE_API_LINK +'/'+ id)
            .then(response => response.json())
            .then(data => setBookDetails(data));
        }
    }, [id]);

    const validateInput = () => {
        const newErrorInput = {};
        if (!bookDetails.title) newErrorInput.title = 'Це поле є обов`язковим';
        if (!bookDetails.yearOfIssue) newErrorInput.yearOfIssue = 'Це поле є обов’язковим';
        setErrorInput(newErrorInput);

        return Object.keys(newErrorInput).length === 0;
    }

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
      };

    const handleSave = () => {
        if(validateInput()) {
            fetch(BASE_API_LINK +'/'+ id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookDetails),
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Error when trying to save book');
                }
                return response.json();
            })
            .then(data => {
                setIsEditing(false);
                setSnackbarMessage('Сутність була успішно відредагована');
                setTimeout(() => setSnackbarMessage(''), 5000);
            })
            .catch(error => {
                setSnackbarMessage('Помилка при спробі зберегти книгу');
                setOpenSnackbar(true);
                console.error(error);
            })
        }
    };

    return (
        <div>
        {bookDetails && (
            <>
                {isEditing ? (
                    <>
                        <input type='text' 
                               defaultValue={bookDetails.title}
                               className={errorInput.title ? 'error' : ''} 
                        />
                        <input type='number' 
                               defaultValue={bookDetails.yearOfIssue}
                               className={errorInput.yearOfIssue ? 'error' : ''} 
                        />
                        <Button onClick={handleSave}>Зберегти</Button>
                        <Button onClick={handleCancel}>Скасувати</Button>
                    </>
                ) : (
                    <>
                        <CardContent>
                            <h2>{bookDetails.title}</h2>
                            <h3>{bookDetails.author.name} {bookDetails.author.surname}</h3>
                            <h4>year of issue - {bookDetails.yearOfIssue}</h4>
                        </CardContent>
                        <Button 
                            onClick={handleEdit}>
                            {<EditIcon />}
                        </Button>
                        <Snackbar 
                            open={openSnackbar}
                            handleClose={handleCloseSnackbar}
                            message={snackbarMessage}
                        />
                    </>
                )}
            </>
        )}
        </div>
    );
}

export default RenderDetails;
