import { Box, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading, Button, Spacer } from "@chakra-ui/react";
import { useContactsContext } from "../hooks/useContactsContext";

const ContactList = ({ contact }) => {

    const { dispatch } = useContactsContext()

    const handleClick = async () => {
        const response = await fetch('/api/contacts/' + contact._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_CONTACT', payload: json})
        }
    }

    return (
        <SimpleGrid p="20px">
            <Card align="left" width="500px" borderRadius={20} boxShadow={"lg"} bg="gray.50" p="20px">

                <Flex alignItems="center" width="100%">
                    <Heading color="blue.500" align="left">{contact.name}</Heading>
                    <Spacer></Spacer>
                    <Button onClick={handleClick}>Delete</Button>
                </Flex>
                <Text textAlign="left">{contact.number}</Text>
                <Text textAlign="left">{contact.email}</Text>

            </Card>
        </SimpleGrid>
    );
}

export default ContactList;