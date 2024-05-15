import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_API_LINK } from 'constants/apiURL';
import Button from 'components/Button';
import EditIcon from './EditIcon';
import CardContent from 'components/CardContent';



function RenderDetails() {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(id === 'new');
    

    useEffect(() => {
        if (id !== 'new') {
            fetch(BASE_API_LINK +'/'+ id)
            .then(response => response.json())
            .then(data => setBookDetails(data));
        }
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div>
        {bookDetails && (
            <>
                {isEditing ? (
                    <>
                        <input type='text' defaultValue={bookDetails.title} />
                        <input type='text' defaultValue={bookDetails.author.name} />
                        <input type='text' defaultValue={bookDetails.author.surname} />
                        <input type='number' defaultValue={bookDetails.yearOfIssue} />
                        <Button onClick={handleSave}>Зберегти</Button>
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
                    </>
                )}
            </>
        )}
        </div>
    );
}

export default RenderDetails;
