import React, { useState } from 'react';

import './style.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function NewIncident() {
    const ongId = localStorage.getItem('id');
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function hadlerNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        try {

            await api.post('incidents',
                data,
                {
                    headers: {
                        authorization: ongId
                    }
                });

            history.push('/profile');
        } catch (error) {
            alert('algo deu errado :(');
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreav detalhadamente para encontrar um herói para resolver isso.
                </p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para Home
                </Link>
                </section>
                <form onSubmit={hadlerNewIncident}>
                    <input placeholder="Título do caso " value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input placeholder="Preço em Reais" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button">
                        Cadastrar
                </button>
                </form>
            </div>
        </div>
    );
}