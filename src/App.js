import React, { useState, useEffect } from 'react';
import './App.css';

const Fighter = ({ name, health, onAttack, isTurn, countdown }) => (
    <div className={`fighter ${isTurn ? 'active' : ''}`}>
        <h2>{name}</h2>
        <p>Health: {health}</p>
        {isTurn && <p>Your turn to hit ({countdown} sec)</p>}
        <button onClick={onAttack} disabled={!isTurn}>
            Attack
        </button>
    </div>
);

const App = () => {
    const [player1Health, setPlayer1Health] = useState(100);
    const [player2Health, setPlayer2Health] = useState(100);
    const [currentTurn, setCurrentTurn] = useState(1);
    const [countdown1, setCountdown1] = useState(20);
    const [countdown2, setCountdown2] = useState(20);

    const handlePlayer1Attack = () => {
        if (currentTurn === 1) {
            const damage = Math.floor(Math.random() * 10) + 1;
            setPlayer2Health(player2Health - damage);
            setCurrentTurn(2);
            setCountdown2(20);
        }
    };

    const handlePlayer2Attack = () => {
        if (currentTurn === 2) {
            const damage = Math.floor(Math.random() * 10) + 1;
            setPlayer1Health(player1Health - damage);
            setCurrentTurn(1);
            setCountdown1(20);
        }
    };

    useEffect(() => {
        if (currentTurn === 1) {
            const timer1 = setInterval(() => {
                setCountdown1((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer1);
                        setCurrentTurn(2);
                        return 20;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            return () => clearInterval(timer1);
        } else if (currentTurn === 2) {
            const timer2 = setInterval(() => {
                setCountdown2((prevCountdown) => {
                    if (prevCountdown === 1) {
                        clearInterval(timer2);
                        setCurrentTurn(1);
                        return 20;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);

            return () => clearInterval(timer2);
        }
    }, [currentTurn]);

    return (
        <div className="container">
            <h1>Two-Player Fighting Game</h1>
            <div className="fighters">
                <Fighter
                    name="Player 1"
                    health={player1Health}
                    onAttack={handlePlayer1Attack}
                    isTurn={currentTurn === 1}
                    countdown={countdown1}
                />
                <Fighter
                    name="Player 2"
                    health={player2Health}
                    onAttack={handlePlayer2Attack}
                    isTurn={currentTurn === 2}
                    countdown={countdown2}
                />
            </div>
        </div>
    );
};

export default App;









