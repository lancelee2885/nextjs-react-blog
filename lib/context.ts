import { createContext } from 'react';

const UserContext = createContext({
    user: null,
    username: null,
})

export default UserContext;