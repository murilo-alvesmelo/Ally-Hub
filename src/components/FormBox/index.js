import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Select from 'react-select';



import styles from './index.module.css'


export default function FormBox(){
    const [country, setContry] = useState([])
    const [city, setCity] = useState([])
    const [selectCountry, setSelectCountry] = useState()
    const [selectCity, setSelectCity] = useState()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [telefone, setTelefone] = useState()
    const [cpf, setCpf] = useState()
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
        'label': i.name
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
    const handleSubmit = (e) =>{
        e.preventDefault()
        setForm({name, email, telefone, cpf, country: selectCountry, city: selectCity})
        window.location.reload()
    }

    
    return(
        <div>
        <Form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.box}>
                <p>Dados Pessoais</p>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name}
                            name="name" 
                            onChange={(e) => (setName(e.target.value))}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type="email"
                            value={email} 
                            name="email" 
                            onChange={(e) => (setEmail(e.target.value))}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control 
                            type="tel"
                            name="telefone" 
                            value={telefone}
                            onChange={(e) => (setTelefone(e.target.value))}/>
                    </Form.Group>
                    <Form.Group className={styles.formGroup}>
                        <Form.Label>CPF</Form.Label>
                        <Form.Control 
                            type="text"
                            value={cpf} 
                            name="cpf" 
                            onChange={(e) => (setCpf(e.target.value))}/>
                    </Form.Group>
            </div>

            <div className={styles.box}>
                <p>Destinos e Interesses</p>
                <div>
                    <Select 
                        options={optionsCountry}
                        isMulti
                        className={styles.select}
                        onChange={handleSelectCountry}
                        />
                    <Select 
                        options={optionsCity}
                        isMulti
                        onChange={handleSelectCity}
                        className={styles.select}
                    />
                </div>
            </div>

            <div className={styles.button}>
                <Button type="submit" variant="primary">Primary</Button>
            </div>
        </Form>
    </div>
)
}