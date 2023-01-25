import { Box, List } from '@mantine/core'
import { TriangleDownIcon } from '@primer/octicons-react'
import useSWR from 'swr'
import './App.css'
import AddTodo from './components/AddTodo'

export const ENDPOINT = 'http://localhost:4000'

export interface Todo {
  id: number
  title: string
  done: boolean
  body: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

function App() {
  const {data, mutate} = useSWR<Todo[]>(`${ENDPOINT}/api/todos`, fetcher);

  const markTodoDone = async (id:number) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((r) => r.json());

      mutate(updated)
  }

  return (
    <>
      <Box
      sx={(theme)=>({
        padding:"2rem",
        width:"100%",
        maxWidth: '40rem',
        margin: "0 auto"
      })}
      >
        <List spacing='xs' size='sm' mb={12} center>
          {data?.map((todo)=>{
            return <List.Item key={`todo_${todo.id}`} onClick={()=>{markTodoDone(todo.id)}}>
              {todo.title} : {todo.done ? "done" : "ongoing"}
            </List.Item>
          })}
        </List>
        <AddTodo mutate={mutate}></AddTodo>
      </Box>
    </>

  )
}

export default App
