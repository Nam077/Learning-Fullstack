import React, { FunctionComponent, useEffect, useState } from 'react';
import Todo, { Account } from './Todo';
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import AddTodo from './AddTodo';

interface OwnProps {
    accounts: Account[];
}
type Props = OwnProps;

const TodoList: FunctionComponent<Props> = (props) => {
    const getAccount = async () => {
        const accounts = await axios.get('http://localhost:8080/account');
        setAccounts(accounts.data);
    };
    const [accounts, setAccounts] = useState(props.accounts);
    useEffect(() => {
        getAccount().catch((err) => console.log(err));
    }, []);
    const deleteAccount = async (id: number) => {
        console.log(id);
        const response = await axios.delete(`http://localhost:8080/account/${id}`);
        const newAccounts = accounts.filter((account) => account.id !== id);
        setAccounts(newAccounts);
    };
    const addAccount = async (account: Account) => {
        const response = await axios.post('http://localhost:8080/account', account);
        const newAccounts = [...accounts, response.data];
        setAccounts(newAccounts);
    };

    const updateAccount = async (account: Account) => {
        const response = await axios.patch(`http://localhost:8080/account/${account.id}`, account);
        const newAccounts = accounts.map((acc) => (acc.id === account.id ? account : acc));
        setAccounts(newAccounts);
    };

    return (
        <div>
            <Container
                sx={{
                    marginTop: '2rem',
                }}
            >
                <AddTodo id={0} addAccount={addAccount} name="" age={0}></AddTodo>
                <Grid container spacing={2} columns={16}>
                    {accounts.map((account, index) => (
                        <Grid key={index} item xs={8}>
                            <Todo
                                deleteAccount={deleteAccount}
                                updateAccount={updateAccount}
                                id={account.id}
                                name={account.name}
                                age={account.age}
                            ></Todo>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default TodoList;
