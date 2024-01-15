import { useEffect } from 'react'
import {Box, VStack, Heading, Flex} from "@chakra-ui/react"
import { useTasksContext } from '../hooks/useTasksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React from 'react'

// components
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'

const Home = () => {
    const {tasks, dispatch} = useTasksContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_TASKS', payload: json})
            }
        }

        if (user) {
            fetchTasks()
        }

        fetchTasks()
    }, [dispatch, user])
 
    return (

        <Box className="home" pt="8%" ml="5%">

            <Box>
                <TaskForm/>
            </Box>

            <Box className="tasks">
                {tasks && tasks.map((task) => (
                    <TaskList key={task._id} task={task}/>
                ))}
            </Box>
            
        </Box>
    )
}

export default Home