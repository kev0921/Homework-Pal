import { Box, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading, Button, Spacer } from "@chakra-ui/react";
import { useContactsContext } from "../hooks/useContactsContext";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

interface Contact {
    _id: string;
    name: string;
    number: string;
    email: string;
  }

interface ContactListProps {
    contact: Contact;
  }
  
const ContactList: React.FC<ContactListProps> = ({ contact }) => {

    const { dispatch } = useContactsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/contacts/' + contact._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_CONTACT', payload: json})
        }
    }

    const handleClickChat = () => {
        
    }

    return (
        <SimpleGrid p="20px">
                <Card align="left" width="500px" borderRadius={20} boxShadow={"lg"} bg="gray.50" p="20px">

                    <Flex alignItems="center" width="100%">
                        <Heading color="blue.500">{contact.name}</Heading>
                        <Spacer></Spacer>
                        <Button onClick={handleClick}>Delete</Button>
                    </Flex>
                    <Text textAlign="left">{contact.number}</Text>
                    <Text textAlign="left">{contact.email}</Text>

                    <Button onClick={handleClickChat}>Chat</Button>

                </Card>
        </SimpleGrid>
    );
}

export default ContactList;