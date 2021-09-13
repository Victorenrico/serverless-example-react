import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import GameService, { IGame } from '../../services/game';

import { 
    Container, 
    Grid, 
    Header, 
    Table, 
    Button,
    Icon,
    Dimmer,
    Loader
} from 'semantic-ui-react';

export const Home = () => {
    const [games, setGames] = useState<IGame[]>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getGames();
    }, []);

    async function getGames(): Promise<void> {
        setLoading(true);

        try {
            const response = await GameService.list();
            setGames(response);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function removeGame(id: number): Promise<void> {
        try {
            await GameService.remove(id);
            setGames(games?.filter(item => item.id != id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Grid columns={2}>
                <Grid.Row style={{ margin: '20px' }}>
                    <Grid.Column textAlign="left">
                        <Header as="h1">Games</Header>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                        <Link to="/item">
                            <Button color="green">
                                <Icon name="add" />
                                Create Item
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column>
                        {loading ? (
                                <Loader active style={{ margin: '50px' }}>Loading...</Loader>
                        ) : (
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Title</Table.HeaderCell>
                                        <Table.HeaderCell>Plataform</Table.HeaderCell>
                                        <Table.HeaderCell>Release</Table.HeaderCell>
                                        <Table.HeaderCell>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {games && games.map(game => (
                                        <Table.Row>
                                            <Table.Cell>
                                                <Link to={{
                                                    pathname: `/item/${game.id}`,
                                                    state: { item: game }
                                                }}
                                                >
                                                    {game.title}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>{game.plataform}</Table.Cell>
                                            <Table.Cell>{game.release}</Table.Cell>
                                            <Table.Cell>
                                                <Button icon color="red" onClick={() => game.id && removeGame(game.id)}>
                                                    <Icon name="trash" />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}