import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import GameService, { IGame } from '../../services/game';

import {
    Container,
    Grid,
    Header,
    Button,
    Icon
} from 'semantic-ui-react';

interface ILocationState {
    item: IGame;
}

export const Detail = () => {
    const [game, setGame] = useState<IGame>();

    const location  = useLocation<ILocationState>();
    const history = useHistory();

    useEffect(() => {
        getItem();
    }, [location]);

    function getItem() {
        if (!location.state) {
            return;
        }

        setGame(location.state.item);
    }

    async function removeGame(id: number): Promise<void> {
        try {
            await GameService.remove(id);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Grid columns={1}>
                <Grid.Row style={{ margin: '20px' }}>
                    <Grid.Column>
                        <Header as="h1" textAlign="center">{game?.title} - {game?.id}</Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <p>
                        <strong>Developer</strong>
                        <br />
                        {game?.developer}
                    </p>
                    <p>
                        <strong>Plataform</strong>
                        <br />
                        {game?.plataform}
                    </p>
                    <p>
                        <strong>Genre</strong>
                        <br />
                        {game?.genre}
                    </p>
                    <p>
                        <strong>Release</strong>
                        <br />
                        {game?.release}
                    </p>
                    <p>
                        <strong>Description</strong>
                        <br />
                        {game?.description}
                    </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign="right">
                        <Button onClick={history.goBack}>
                            Cancel
                        </Button>
                        <Button icon color="red" onClick={() => game?.id && removeGame(game.id)}>
                            <Icon name="trash" />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}