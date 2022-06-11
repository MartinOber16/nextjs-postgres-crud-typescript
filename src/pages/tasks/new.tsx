import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Card, Confirm, Form, FormField, Grid, Icon } from 'semantic-ui-react';
import { Task } from 'src/interfaces/Task';
import { useRouter } from 'next/router'
import Layout from 'src/components/Layout';

export default function NewPage() {

    const [task, setTask] = useState({
        title: '',
        description: '',
    })
    const [openConfirm, setOpenConfirm] = useState(false)

    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        })
    }

    const createTask = async (task: Task) => {
        const resp = await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await resp.json()
        console.log(data);
    }

    const updateTask = async (id: string, task: Task) => {
        const resp = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await resp.json()
        console.log(data);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                await updateTask(router.query.id, task)
            } else {
                await createTask(task)
            }
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const resp = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await resp.json()
            console.log(data);
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    const loadTask = async (id: string) => {
        const resp = await fetch(`http://localhost:3000/api/tasks/${id}`)
        const task = await resp.json()
        setTask({
            title: task.title,
            description: task.description,
        })
    }

    useEffect(() => {
        if (typeof router.query.id === 'string') {
            loadTask(router.query.id);
        }
    }, [router.query])



    return (
        <Layout>
            <Grid centered columns={3} verticalAlign='middle' style={{ height: '70%' }}>
                <Grid.Column>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <FormField>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder='Write your title'
                                        onChange={handleChange}
                                        value={task.title} />
                                </FormField>
                                <FormField>
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        name="description"
                                        rows={2}
                                        placeholder='Write your description'
                                        onChange={handleChange}
                                        value={task.description}
                                    />
                                </FormField>
                                {
                                    router.query.id ? (
                                        <Button color='teal'>
                                            <Icon name='save' />
                                            Update
                                        </Button>
                                    ) : (
                                        <Button primary>
                                            <Icon name='save' />
                                            Save
                                        </Button>
                                    )
                                }
                            </Form>
                        </Card.Content>
                    </Card>

                    {
                        router.query.id && (
                            <Button color='red' onClick={() => setOpenConfirm(true)}>
                                <Icon name='delete' />
                                Delete
                            </Button>
                        )
                    }
                </Grid.Column>
            </Grid>

            <Confirm
                header='Delete a task'
                content={`Are you sure you want to delete this task ${router.query.id}?`}
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => typeof router.query.id === 'string' && handleDelete(router.query.id)}
            />
        </Layout>
    )
}
