import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_API_LINK } from 'constants/apiURL';
import Button from 'components/Button';
import EditIcon from './EditIcon';
import CardContent from 'components/CardContent';
import Snackbar from 'components/Snackbar';
import { useNavigate } from 'react-router-dom';
import fetchMock from 'fetch-mock';

function RenderDetails() {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [originalBookDetails, setOriginalBookDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(id === 'new');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [errorInput, setErrorInput] = useState({});
    const navigate = useNavigate();
    

    const handleBack = () => {
        navigate(-1);
    };
    
    fetchMock.get(BASE_API_LINK + '/' + id, {
        status: 200,
        body: { title: 'Test Book', yearOfIssue: 'test year' }, 
    }, {
        overwriteRoutes: true
    });
    
    fetchMock.put(BASE_API_LINK + '/' + id, {
        status: 200,
        body: { message: 'Сутність була успішно відредагована' }
    });

    useEffect(() => {
        if (id !== 'new') {
            fetch(BASE_API_LINK +'/'+ id)
            .then(response => response.json())
            .then(data => {
                setBookDetails(data);
                setOriginalBookDetails(data);
            });
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
        setBookDetails(originalBookDetails);
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
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: 'New Title' }),
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Error when trying to save book');
                }
                return response.json();
            })
            .then(data => {
                setIsEditing(false);
                console.log(data);
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
                               value={bookDetails.title}
                               onChange={(e) => setBookDetails({...bookDetails, title: e.target.value})}
                               style={errorInput.title ? { border: '1px solid red' } : {}} 
                        />
                        <input type='number' 
                               value={bookDetails.yearOfIssue}
                               onChange={(e) => setBookDetails({...bookDetails, yearOfIssue: e.target.value})}
                               style={errorInput.yearOfIssue ? { border: '1px solid red' } : {}} 
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
        <Button onClick={handleBack}>Назад</Button>
        </div>
    );
}

export default RenderDetails;
