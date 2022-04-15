import React,{useEffect, useState} from 'react';
import {PropTypes} from 'prop-types'

const Gamestate = ({state_title,attempts,restart}) => {
    const [_attempts, setAttempts] = useState(attempts);

    useEffect(() => {
      setAttempts(attempts);
        
    }, [attempts]);

    function showStartBtn(attempts){
        if (attempts == 0){
            return <button className="border p-2 m-2 bg-blue-100 hover:bg-blue-500" onClick={restart}>Restart Game</button>
        }
    }

    return (
        <div className="m-auto">
            {state_title} You have {_attempts} remaining {showStartBtn(attempts)}
        </div>
    );
}

Gamestate.propTypes = {
    state_title: PropTypes.string,
    attempts: PropTypes.number,
    restart: PropTypes.func
}

export default Gamestate;
