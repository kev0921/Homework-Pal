import { useState } from "react"
import { useContactsContext } from '../hooks/useContactsContext'
import {FormControl, FormLabel, Box, Input, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading } from "@chakra-ui/react";


const ContactForm = () => {
    const { dispatch } = useContactsContext()
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const contact = {name, number, email}

        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            setNumber('')
            setEmail('')
            setError(null)
            console.log('new contact added', json)
            dispatch({type: 'CREATE_CONTACT', payload: json})
        }
    }

    return(
        <Box>
            <form className="create" onSubmit={handleSubmit}>
                
                <Heading>Add a new contact</Heading>

                <FormControl id="name">
                    <FormLabel>Contact Name</FormLabel>
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
                </FormControl>

                <FormControl id="number">
                    <FormLabel>Contact Number</FormLabel>
                    <Input type="text" value={number} onChange={(e) => setNumber(e.target.value)}></Input>
                </FormControl>

                <FormControl id="email">
                    <FormLabel>Contact Email</FormLabel>
                    <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                </FormControl>

                <Button type="submit">Add Contact</Button>

                {error && <Box className="error">{error}</Box>}
            
            </form> 
        </Box>
    )
}

export default ContactForm