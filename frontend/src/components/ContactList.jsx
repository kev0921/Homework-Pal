import { Box, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading } from "@chakra-ui/react";

const ContactList = ({ contact }) => {
    return (
        <SimpleGrid p="20px">
            <Card align="left" width="500px" borderRadius={20} boxShadow={"lg"} bg="gray.50" p="20px">
                <Heading color="blue.500" align="left">{contact.name}</Heading>
                <Text textAlign="left">{contact.number}</Text>
                <Text textAlign="left">{contact.email}</Text>
            </Card>
        </SimpleGrid>
    );
}

export default ContactList;