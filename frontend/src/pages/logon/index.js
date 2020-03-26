import React, { useState } from 'react';
import './style.css';
import '../../global.css'
import { FiLogIn } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();
    async function handlerLogin(e) {
        e.preventDefault();

        const data = {id};

        try {
            const response = await api.post('sessions', data);

            localStorage.setItem('id', id);
            localStorage.setItem('nome', response.data.nome);
            history.push('/profile')
        } catch (error) {
            alert('Falha na autenticação :(')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handlerLogin}>
                    <h1>
                        Faça seu Logon
                    </h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Nao tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes    " />
        </div>
    );
} 