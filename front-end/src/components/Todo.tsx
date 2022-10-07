import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import UpdateTodo from './UpdateTodo';

export interface Account {
    id: number;
    name: string;
    age: number;
}

export interface OwnProps extends Account {
    deleteAccount: (id: number) => void;
    updateAccount: (account: Account) => void;
}

type Props = OwnProps;

const Todo: FunctionComponent<Props> = (props) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const handleDelete: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        props.deleteAccount(props.id);
    };
    const handleUpdate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        setIsUpdate(!isUpdate);
    };
    return (
        <div>
            <Card
                sx={{
                    margin: '1rem',
                }}
            >
                <CardMedia component="img" alt="green iguana" height="140" image="https://picsum.photos/690/388" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.age}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.id}
                    </Typography>
                </CardContent>
                <CardActions>
                    {/*Update Button*/}
                    <Button onClick={handleUpdate} variant={'contained'} color={'success'} size="small">
                        Update
                    </Button>
                    {/*Delete Button*/}
                    <Button
                        onClick={handleDelete}
                        variant={'contained'}
                        color={'error'}
                        size="small"
                        disabled={isUpdate}
                        sx={{ marginLeft: '1rem' }}
                    >
                        Delete
                    </Button>
                </CardActions>

                {isUpdate && (
                    <UpdateTodo
                        updateAccount={props.updateAccount}
                        id={props.id}
                        name={props.name}
                        age={props.age}
                    ></UpdateTodo>
                )}
            </Card>
        </div>
    );
};

export default Todo;
