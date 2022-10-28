import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Select from 'react-select';



import styles from './index.module.css'


export default function FormBox(){
    const [country, setContry] = useState([])
    const [city, setCity] = useState([])
    const optionsCountry = country.map(i => ({
        'key': i.i,
        'label': i.name
    }))
    const optionsCity = city.map(i => ({
        'key': i.i,
        'label': i.name
    }))
    function handleSubmit(){

    }

    useEffect(() => {
        fetch('https://amazon-api.sellead.com/city', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const copyCity = []
                for(let i = 0; i < data.length; i++){
                    copyCity.push(data[i])
                }
                setCity(copyCity)
            })
            .catch((err) => console.log(err))
    }, [])


    useEffect(() => {
        fetch('https://amazon-api.sellead.com/country', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                const copyCountry = []
                for(let i = 0; i < data.length; i++){
                    copyCountry.push(data[i])
                }
                setContry(copyCountry)
            })
            .catch((err) => console.log(err))
    }, [])

    return(
        <div>
            <Form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.box}>
                    <p>Dados Pessoais</p>
                        <Form.Group className={styles.formGroup}controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name"/>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email"/>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}controlId="formBasicEmail">
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control type="tel" name="telefone"/>
                        </Form.Group>
                        <Form.Group className={styles.formGroup}controlId="formBasicEmail">
                            <Form.Label>CPF</Form.Label>
                            <Form.Control type="text" name="cpf"
                                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                            />
                        </Form.Group>
                </div>

                <div className={styles.box}>
                    <p>Destinos e Interesses</p>
                    <div>
                        <Select 
                            options={optionsCountry}
                            isMulti
                            className={styles.select}
                        />
                        <Select 
                            options={optionsCity}
                            isMulti
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