import { useState } from "react";
import { useHistory } from 'react-router-dom';

import GameService, { IGame } from '../../services/game';

import {
    Container,
    Grid,
    Header,
    Form,
    TextArea,
    Button,
    Icon
} from 'semantic-ui-react';

interface IForm extends IGame {}

export const Create = () => {
    const [form, setForm] = useState<IForm>({} as IForm);

    const history = useHistory();

    function handleChange(key: string, value: string) {
        setForm({ ...form, [key]: value });
    }

    async function handleSubmit() {
        if (!form) {
            return;
        }

        try {
            await GameService.create(form);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Grid columns={1}>
                <Grid.Row style={{ margin: '20px' }}>
                    <Grid.Column>
                        <Header as="h1" textAlign="center">Create Item</Header>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Form>
                <Form.Group widths="equal">
                    <Form.Input 
                        fluid
                        label="Title"
                        onChange={(e, { value }) => handleChange('title', value)}
                    />
                    <Form.Input 
                        fluid
                        label="Developer"
                        onChange={(e, { value }) => handleChange('developer', value)}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input 
                        fluid
                        label="Plataform"
                        onChange={(e, { value }) => handleChange('plataform', value)}
                    />
                    <Form.Input 
                        fluid
                        label="Genre"
                        onChange={(e, { value }) => handleChange('genre', value)}
                    />
                    <Form.Input 
                        fluid
                        label="Release"
                        onChange={(e, { value }) => handleChange('release', value)}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input 
                        fluid
                        control={TextArea}
                        label="Description"
                        onChange={(e, { value }) => handleChange('description', value)}
                    />
                </Form.Group>
            </Form>
            <Grid columns={1}>
                <Grid.Row>
                    <Grid.Column textAlign="right">
                        <Button onClick={history.goBack}>
                            Cancel
                        </Button>
                        <Button icon color="green" onClick={handleSubmit}>
                            <Icon name="add" />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}