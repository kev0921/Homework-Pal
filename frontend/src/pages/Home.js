import { useEffect, useState } from 'react'

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
        <div className="home">
            <div className="contacts">
                {contacts && contacts.map((contact) => (
                    <ContactList key={contact._id} contact={contact}/>
                ))}
            </div>
        </div>
    )
}

export default Home