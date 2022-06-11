import Image from 'next/image'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useRouter } from 'next/router';

export default function Navbar() {

    const router = useRouter();

    return (
        <Menu inverted attached style={{ padding: '1.5rem' }}>
            <Container>
                <Menu.Item onClick={() => router.push('/')}>
                    <Image
                        src='https://react.semantic-ui.com/logo.png'
                        width={30}
                        height={30}
                        alt='Imagen'
                    />
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button onClick={() => router.push('/tasks/new')}>New task</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}
