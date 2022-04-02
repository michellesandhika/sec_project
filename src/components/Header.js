import React from 'react';
import { useNavigate } from 'react-router-dom';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import '../styles/Header.css';

function Header({ user }) {
    const navigate = useNavigate();

    return (
        <header className='header__container'>
            <h1 className='header__logo' onClick={() => navigate('/')}>LOGO</h1>
            <div className='header__navigations'>
                {user && <div onClick={() => navigate('/upload')}><FileUploadOutlinedIcon /></div>}
                {user && <div onClick={() => navigate('/checkout')}><ShoppingCartOutlinedIcon /></div>}
                <div onClick={() => navigate('/account')}><PersonOutlineOutlinedIcon /></div>
            </div>
        </header>
    );
}

export default Header;