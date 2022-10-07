import React, { FunctionComponent, useState } from 'react';
import { Button, Container, Grid, Input } from '@mui/material';
import { Account } from './Todo';

interface OwnProps extends Account {
    addAccount: (account: Account) => void;
}

type Props = OwnProps;

const AddTodo: FunctionComponent<Props> = (props) => {
    const [name, setName] = useState(props.name);
    const [age, setAge] = useState(props.age);
    const handleAdd = () => {
        props.addAccount({ id: props.id, name, age });
        setName(randomName());
        setAge(randomAge());
    };
    const randomName = () => {
        const names = ['John', 'Paul', 'George', 'Ringo'];
        return names[Math.floor(Math.random() * names.length)];
    };
    const randomAge = () => {
        return Math.floor(Math.random() * 100);
    };

    const handleChangeName: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setName(event.target.value);
    };

    const handleChangeAge: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setAge(Number(event.target.value));
    };

    return (
        <div>
            <Container
                sx={{
                    padding: '1rem',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Input
                            sx={{ width: '100%' }}
                            value={name}
                            onChange={handleChangeName}
                            placeholder="Name"
                        ></Input>
                    </Grid>
                    <Grid item xs={12}>
                        <Input sx={{ width: '100%' }} value={age} onChange={handleChangeAge} placeholder="Age"></Input>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            sx={{
                                width: '100%',
                            }}
                            variant="contained"
                            color="success"
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default AddTodo;
