import { useState } from "react";
import { useContactsContext } from "../hooks/useContactsContext";
import { useLogin } from "../hooks/useLogin";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Input, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading, Divider } from "@chakra-ui/react";
import React from "react";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
    <Box p="100px">
      <form className="login" onSubmit={handleSubmit}>
        <Heading>Log in</Heading>
        <FormControl id="email">
          <FormLabel>Email:</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password:</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button disabled={isLoading} type="submit">Log in</Button>
        {error && <div>{error}</div>}
      </form>
    </Box>
    )
}

export default Login