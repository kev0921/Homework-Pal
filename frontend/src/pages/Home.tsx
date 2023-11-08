import { useEffect } from 'react'
import {Box, VStack, Heading, Flex} from "@chakra-ui/react"
import { useContactsContext } from '../hooks/useContactsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'

// components
import ContactList from '../components/ContactList'
import ContactForm from '../components/ContactForm'

const Home = () => {
    const {contacts, dispatch} = useContactsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('/api/contacts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CONTACTS', payload: json})
            }
        }

        if (user) {
            fetchContacts()
        }

        fetchContacts()
    }, [dispatch, user])
 
    return (

        <Box className="home" pt="8%" ml="5%">

            <Box>
                <ContactForm/>
            </Box>

            <Box className="contacts">
                {contacts && contacts.map((contact) => (
                    <ContactList key={contact._id} contact={contact}/>
                ))}
            </Box>
            
        </Box>
    )
}

export default Home