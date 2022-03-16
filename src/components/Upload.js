import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import '../styles/Upload.css';

function Upload() {
    const [ filename, setFilename ] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('upload');

        // TODO: what next (???)
    };

    return (
        <main className='upload__container'>
            <form onSubmit={handleSubmit}>
                <h2>Upload File</h2>

                <div className='upload__info'>
                    <TextField label='Title' fullWidth required />
                    <TextField label='Description' multiline fullWidth />
                    <TextField label='Price' type='number' fullWidth required />
                </div>

                <div className='upload__file'>
                    <label htmlFor='upload-file'>
                        <TextField id='upload-file' type='file' accept='image/*' style={{ display: 'none' }} onChange={(e) => setFilename(e.target.value)} />
                        <Button variant='outlined' component='span' startIcon={<AttachFileOutlinedIcon />}>Choose file</Button>
                    </label> 
                    <TextField value={filename?.split('\\')[2] || 'No file chosen'} InputProps={{ readOnly: true }} size='small' fullWidth />
                </div>
                
                <Button type='submit' variant='contained' startIcon={<FileUploadOutlinedIcon />}>Upload</Button>
            </form>
        </main>
    );
}

export default Upload;