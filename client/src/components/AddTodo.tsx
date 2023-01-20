
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import {ENDPOINT} from "../App";
import {ToDo} from "../App";

const AddTodo = ({mutate}) => {
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: "",
            body:"",
        }
    })

    const createTodo = () => {
        fetch(`${ENDPOINT}/api/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form.values)
        }).then((response) => {
            response.json()
        }).then((data)=>{mutate(data)})

        form.reset();
        setOpen(false);
    }

    return (
        <>
            <Modal opened={open} onClose={()=>setOpen(false)} title="Create todo">
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput mb={12} label="title" {...form.getInputProps('title')} />
                    <TextInput mb={12} label="body" {...form.getInputProps('body')} />
                    <Button type="submit">Submit</Button>
                </form>
            </Modal>

            <Group position="center">
                <Button fullWidth mb={12} onClick={()=>setOpen(true)}>
                    Add todo
                </Button>
            </Group>
        </>
    )
}

export default AddTodo;