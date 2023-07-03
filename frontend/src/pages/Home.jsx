import { useEffect, useState } from 'react'
import {Box, VStack, Heading} from "@chakra-ui/react"

// components
import ContactList from '../components/ContactList'

const Home = () => {
    const [contacts, setContacts] = useState(null)

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('/api/contacts')
            const json = await response.json()

            if (response.ok){
                setContacts(json)
            }
        }

        fetchContacts()
    }, [])

    return (
        <Box className="home" pt="100px" ml="50px">
            <Box className="contacts">
                {contacts && contacts.map((contact) => (
                    <ContactList key={contact._id} contact={contact}/>
                ))}
            </Box>
        </Box>
    )
}

export default Home