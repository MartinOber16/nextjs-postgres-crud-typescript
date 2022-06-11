import { Task } from 'src/interfaces/Task';
import { Grid, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router'
import TaskList from 'src/components/tasks/TaskList';
import Layout from 'src/components/Layout';

interface Props {
  tasks: Task[]
}

export default function Index(props: Props) {

  const router = useRouter();

  return (
    <Layout>
      {(props.tasks.length === 0) ? (
        <Grid columns={3} centered verticalAlign='middle' style={{ height: '70%' }}>
          <Grid.Row>
            <Grid.Column>
              <h1>No tasks yet</h1>
              <Button onClick={() => router.push('/tasks/new')}>Create one</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <TaskList tasks={props.tasks} />
      )}
    </Layout>
  )
}

export const getServerSideProps = async () => {

  const resp = await fetch('http://localhost:3000/api/tasks')
  const tasks = await resp.json()

  return {
    props: {
      tasks,
    }
  }
}