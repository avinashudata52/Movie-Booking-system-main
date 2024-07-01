import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    return (
        <Context.Provider value={{ user, setUser }}>
            {children}
        </Context.Provider>
    );
};

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};