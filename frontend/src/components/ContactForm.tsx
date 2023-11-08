import { useState } from "react";
import { useContactsContext } from "../hooks/useContactsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Input, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading } from "@chakra-ui/react";
import React from "react";

const ContactForm = () => {
  const { dispatch } = useContactsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isError1 = name === "" && formSubmitted;
  const isError2 = number === "" && formSubmitted;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!user) {
      setError('You must be logged in')
      return
    }

    const contact = { name, number, email };

    const response = await fetch("/api/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setName("");
      setNumber("");
      setEmail("");
      setError('');
      setEmptyFields([]);
      setFormSubmitted(false);
      console.log("new contact added", json);
      dispatch({ type: "CREATE_CONTACT", payload: json });
    }
  };

  return (
    <Box>
      <form className="create" onSubmit={handleSubmit}>
        <Heading>Add a new contact</Heading>

        <FormControl id="name" isInvalid={isError1}>
          <FormLabel>Contact Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          {!isError1 ? (
            <FormHelperText>Enter the contact's full name</FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="number" isInvalid={isError2}>
          <FormLabel>Contact Number</FormLabel>
          <Input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />

          {!isError2 ? (
            <FormHelperText>Enter the contact's phone number</FormHelperText>
          ) : (
            <FormErrorMessage>Number is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="email">
          <FormLabel>Contact Email</FormLabel>
          <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <Button type="submit">Add Contact</Button>

        {error && <Box className="error">{error}</Box>}
      </form>
    </Box>
  );
};

export default ContactForm;
