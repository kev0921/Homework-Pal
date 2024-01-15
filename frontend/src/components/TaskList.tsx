import { Box, VStack, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Flex, Image, HStack, Heading, Button, Spacer } from "@chakra-ui/react";
import { useTasksContext } from "../hooks/useTasksContext";
import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

interface Task {
    _id: string;
    name: string;
    subject: string;
    description: string;
  }

interface TaskListProps {
    task: Task;
  }
  
const TaskList: React.FC<TaskListProps> = ({ task }) => {

    const { dispatch } = useTasksContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        const response = await fetch('/api/tasks/' + task._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TASK', payload: json})
        }
    }

    return (
        <SimpleGrid p="20px">
                <Card align="left" width="50%" borderRadius={20} boxShadow={"lg"} bg="gray.50" p="20px">

                    <Flex alignItems="center" width="100%">
                        <Heading color="blue.500">{task.name}</Heading>
                        <Spacer></Spacer>
                        <Button onClick={handleClick}>Delete</Button>
                    </Flex>
                    <Text textAlign="left">{task.subject}</Text>
                    <Text textAlign="left">{task.description}</Text>

                </Card>
        </SimpleGrid>
    );
}

export default TaskList;