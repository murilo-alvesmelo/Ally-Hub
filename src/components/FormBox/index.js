import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import { IMaskInput } from "react-imask";
import Select from 'react-select';
import * as yup from 'yup';


import styles from './index.module.css'


export default function FormBox(){
    const [country, setContry] = useState([])
    const [city, setCity] = useState([])
    const [selectCountry, setSelectCountry] = useState()
    const [selectCity, setSelectCity] = useState()
    const [status, setStatus] = useState({type: '', mensagem: ''})
    const [form, setForm] = useState({
        name: '',
        email: '',
        telefone: '',
        cpf: '',
        country: [],
        city: []
    })

    
    const optionsCountry = country.map(i => ({
        'value': i.code,
        'label': i.name_ptbr
    }))
    const optionsCity = city.map(i => ({
        'value': i.id,
        'label': i.name_ptbr
    }))

    useEffect(() => {
        fetch('https://amazon-api.sellead.com/city', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(getCity);
            })
            .catch((err) => console.log(err))
        }, [])
        
    useEffect(() => {
        fetch('https://amazon-api.sellead.com/country', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            data.forEach(getCountry);
        })
        .catch((err) => console.log(err))
    }, [])

    function handleSelectCountry(e){
        e.forEach(getSelecetCountry)
    }
    function handleSelectCity(e){
        e.forEach(getSelecetCity)
    }
    function getSelecetCountry(item, index, arr){
        arr[index] = item
        setSelectCountry(arr)
    }
    function getSelecetCity(item, index, arr){
        arr[index] = item
        setSelectCity(arr)
    }
    function getCountry(item, index, arr){
        arr[index] = item
        setContry(arr)
    }
    function getCity(item, index, arr){
        arr[index] = item
        setCity(arr)
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()
        if(!(await validate())) return
        console.log(form)
    }
    const valueInput = e => setForm({...form, [e.target.name]: e.target.value})

    async function validate(){
        let schema = yup.object().shape({
            cpf: yup.string()
                .required("Necessário preencher o campo cpf!"),
            telefone: yup.string()
                .required("Necessário preencher o campo telefone!"),
            email: yup.string()
                .required("Necessário preencher o campo email!"),
            name: yup.string()
                .required("Necessário preencher o campo nome!"),
            
        });
        try{
            await schema.validate(form)
            return true
        }catch(err){
            setStatus({
                type: 'error',
                mensagem: err.errors
            });
            return false
        }
    }
    return(
        <div className={styles.container}>
        <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.box}>
                <p>Dados Pessoais</p>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={form.name}
                            name="name" 
                            onChange={valueInput}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            value={form.email} 
                            name="email" 
                            onChange={valueInput}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control 
                            as={IMaskInput}
                            mask="+00 (00) 0 0000-0000"
                            type="tel"
                            name="telefone" 
                            value={form.telefone}
                            onChange={valueInput}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control 
                            as={IMaskInput}
                            mask="000.000.000-00"
                            type="text"
                            value={form.cpf} 
                            name="cpf" 
                            onChange={valueInput}/>
                    </Form.Group>
            </div>

            <div className={styles.box}>
                <p>Destinos e Interesses</p>
                <div>
                    <Select 
                        options={optionsCountry}
                        isMulti
                        placeholder='Países'
                        className={styles.select}
                        onChange={handleSelectCountry}
                        />
                    <Select 
                        options={optionsCity}
                        isMulti
                        placeholder='Cidades'
                        onChange={handleSelectCity}
                        className={styles.select}
                    />
                </div>
                <p>{status.mensagem}</p>
            </div>

            <div className={styles.divButton}>
                <button type="submit" className={styles.btn}>Enviar</button>
            </div>
        </Form>
    </div>
)
}