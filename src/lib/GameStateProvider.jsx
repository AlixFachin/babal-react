import React, { createContext } from "react";
import PropTypes from 'prop-types';

import { useInterpret } from "@xstate/react";
import { gameMachine } from "./gameMachine.js";

export const GlobalGameContext = createContext({});

export const GameStateProvider = (props) => {
    const gameService = useInterpret(gameMachine);

    return (
        <GlobalGameContext.Provider value={{ gameService }}>
            { props.children }
        </GlobalGameContext.Provider>
    );

};

GameStateProvider.propTypes = {
    children: PropTypes.node,
};