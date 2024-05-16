import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import { BASE_API_LINK } from 'constants/apiURL';

function NewBook() {
    const [title, setTitle] = useState('');
    const [yearOfIssue, setYearOfIssue] = useState('');
    const [authorId, setAuthorId] = useState('');
    const navigate = useNavigate();

    const handleSave = () => {

        fetch(BASE_API_LINK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                yearOfIssue,
                author: { id: authorId },
          }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when trying to save book');
            }
            navigate({NewBook});
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
           <input
                type='number'
                placeholder='Year of Issue'
                value={yearOfIssue}
                onChange={(e) => setYearOfIssue(e.target.value)}
            />
            <input
                type='text'
                placeholder='Author ID'
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
            />
            <Button onClick={handleSave}>Зберегти</Button>
        </div>
      );
}


export default NewBook;