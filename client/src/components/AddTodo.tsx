
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, Group, Modal } from "@mantine/core";

const AddTodo: React.FC = () => {
    const [open, setOpen] = useState(false);

    const form = useForm({
        initialValues: {
            title: "",
            body:"",
        }
    })

    return (
        <>
            <Modal opened={open} onClose={()=>setOpen(false)} title="Create todo">
                test
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