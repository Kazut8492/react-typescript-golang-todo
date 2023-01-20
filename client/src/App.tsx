import { Box } from '@mantine/core'
import useSWR from 'swr'
import './App.css'
import AddTodo from './components/AddTodo'

export const ENDPOINT = 'http://localhost:4000'

export interface ToDo {
  id: number
  title: string
  done: boolean
  body: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

function App() {
  const {data, mutate} = useSWR<ToDo[]>(`${ENDPOINT}/api/todos`, fetcher);

  return (
    <>
      <Box>{JSON.stringify(data)}</Box>
      <AddTodo mutate={mutate}></AddTodo>
    </>

  )
}

export default App
