import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';

import { TextField, Button, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { checkDuplicates, createItem, addItemToUser } from '../services/firestore'
import { verifyCaptcha } from '../services/utilities';
import { makeStorageClient } from '../services/ipfs';
import { useStateContext } from '../services/StateContext';
import '../styles/Upload.css';

function Upload() {
    const navigate = useNavigate();
    const { register, handleSubmit, setValue } = useForm();
    const [ { user }, dispatch ] = useStateContext();

    const [ filename, setFilename ] = useState();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ message, setMessage ] = useState('');

    const storeFiles = async (files) => {
        const client = makeStorageClient;
        const cid = await client.put(files);
        return cid;
    };

    const onSubmit = async (data) => {
        if (!data.captcha) {
            setError(true);
            setMessage('Please verify that you\'re not a robot.');
            return;
        }

        setLoading(true);
        const cid = await storeFiles(data.filename);
        const duplicates = await checkDuplicates(cid);
        
        if (duplicates) {
            setError(true);
            setMessage('This image has already been uploaded once, please upload a new image.');
            setLoading(false);
            return;
        }
        
        const item = {
            Title: data.title,
            Description: data.description || '',
            FileName: filename?.split('\\')[2],
            ForSale: true,
            Owner: user.email,
            PostedTime: new Date(),
            Price: parseInt(data.price),
        }

        console.log(cid, item);
        await createItem(cid, item);
        await addItemToUser(cid, user.email);

        setLoading(false);
        navigate('/account');
    };

    const handleCaptcha = async (value) => {
        const response = await verifyCaptcha(value);
        if (response.success)
            setValue('captcha', value);
    };

    return (
        <main className='upload__container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2>Upload File</h2>

                {error && <Alert severity='error'>{message}</Alert>}

                <div className='upload__info'>
                    <TextField label='Title' fullWidth required {...register('title')} />
                    <TextField label='Description' multiline fullWidth {...register('description')} />
                    <TextField label='Price' type='number' inputProps={{ min: '100', step: '10' }} fullWidth required {...register('price')} />
                </div>

                <div className='upload__file'>
                    <label htmlFor='upload-file'>
                        <TextField id='upload-file' type='file' accept='image/*' style={{ display: 'none' }} {...register('filename', { onChange: (e) => setFilename(e.target.value) })} />
                        <Button variant='outlined' component='span' startIcon={<AttachFileOutlinedIcon />}>Choose file</Button>
                    </label>
                    <TextField value={filename?.split('\\')[2] || 'No file chosen'} InputProps={{ readOnly: true }} size='small' fullWidth />
                </div>

                <ReCAPTCHA sitekey='6LdRy_0eAAAAAL08kTosI_LnAgBf8SDI_XSiWvQz' onChange={handleCaptcha} />
                <LoadingButton type='submit' loading={loading} variant='contained' startIcon={<FileUploadOutlinedIcon />}>Upload</LoadingButton>
            </form>
        </main>
    );
}

export default Upload;
