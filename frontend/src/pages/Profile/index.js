import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import './style.css'
import api from '../../services/api';
export default function Profile() {
    const ongName = localStorage.getItem('nome')
    const ongId = localStorage.getItem('id');
    const history = useHistory();
    const [incidents, setIncident] = useState([]);

    useEffect(() => {
        api.get('profille', {
            headers: {
                authorization: ongId
            }
        }).then(response => setIncident(response.data));
    },
        [])

    async function handleDelete(id){
        try {
            await api.delete(`incidents/${id}`, {headers: {authorization: ongId}});
            setIncident(incidents.filter(el => el.id !== id));
        } catch (error) {
            alert('erro ao deletar');
        }
    }

    function HandlerLogout(){
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span> Bem vinda {ongName}</span>
                <Link to="/incidents/new" className="button" > Cadastrar Novo Caso</Link>
                <button onClick={HandlerLogout}>
                    <FiPower size={18} colo="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>{
                incidents.map(element => (
                    <li key={element.id}>
                        <strong>CASO:</strong>
                        <p>{element.title}</p>
                        <strong>DESCRICAO:</strong>
                        <p>{element.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(element.value)}</p>
                        <button  onClick={ () => handleDelete(element.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}