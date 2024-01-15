import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Box, Input, Button, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading } from "@chakra-ui/react";
import React from "react";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isError1 = name === "" && formSubmitted;
  const isError2 = subject === "" && formSubmitted;

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!user) {
      setError('You must be logged in')
      return
    }

    const task = { name, subject, description };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
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
      setSubject("");
      setDescription("");
      setError('');
      setEmptyFields([]);
      setFormSubmitted(false);
      console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <Box>
      <form className="create" onSubmit={handleSubmit}>
        <Heading>Add a new task</Heading>

        <FormControl id="name" isInvalid={isError1}>
          <FormLabel>Task Name</FormLabel>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          {!isError1 ? (
            <FormHelperText>Enter the name of the task</FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="subject" isInvalid={isError2}>
          <FormLabel>School Subject</FormLabel>
          <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />

          {!isError2 ? (
            <FormHelperText>Enter the school subject related to the task</FormHelperText>
          ) : (
            <FormErrorMessage>Subject is required.</FormErrorMessage>
          )}
        </FormControl>

        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormControl>

        <Button type="submit">Add Task</Button>

        {error && <Box className="error">{error}</Box>}
      </form>
    </Box>
  );
};

export default TaskForm;
