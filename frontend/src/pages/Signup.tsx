import { useState } from "react";
import { useContactsContext } from "../hooks/useContactsContext";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Input, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
    <Box p="100px">
      <form className="signup" onSubmit={handleSubmit}>
        <Heading>Sign up</Heading>
        <FormControl id="email">
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password:</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button disabled={isLoading} type="submit">Sign up</Button>
        {error && <div>{error}</div>}
      </form>
    </Box>
    )
}

export default Signup