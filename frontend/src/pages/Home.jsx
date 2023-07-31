import { useEffect } from 'react'
import {Box, VStack, Heading, Flex} from "@chakra-ui/react"
import { useContactsContext } from '../hooks/useContactsContext'

// components
import ContactList from '../components/ContactList'
import ContactForm from '../components/ContactForm'

const Home = () => {
    const {contacts, dispatch} = useContactsContext()

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await fetch('/api/contacts')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CONTACTS', payload: json})
            }
        }

        fetchContacts()
    }, [dispatch])
 
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