import React, {useState} from 'react';
import './style.css';
import {FiArrowLeft} from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg'

import api from '../../services/api';

export default function Register(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsApp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');

    const history = useHistory();
    
    async function handlerRegister(e){
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };
        try {
            const response =  await api.post('ongs', data);
            alert(`Seu ID gerado: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Algo deu errado :(')
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma e ajude  pessoas a encontrarem sua ONG.
                    </p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Nao tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handlerRegister}>
                    <input placeholder="Nome da ONG" value={nome} onChange={e => setNome(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsApp(e.target.value)}/>
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)}/>
                        <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={{width: 80}}/>
                    </div>
                    <button className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}