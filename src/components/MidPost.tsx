import React from 'react'
import { Button, Spinner } from 'reactstrap'
import { PropsMid } from '../types'

const MidPost: React.FC<PropsMid> = ({
    gameOver,
    startTrivia,
    wrongCount,
    MAX_WRONG,
    loading,
    resetTrivia,
}) => {
    return (
        <>
            {gameOver && (
                <Button
                    color="primary"
                    className="my-2"
                    onClick={startTrivia}
                    block
                >
                    Start
                </Button>
            )}

            {!gameOver && !loading && (
                <Button onClick={resetTrivia}>
                    {wrongCount !== MAX_WRONG ? 'Restart' : 'New game'}
                </Button>
            )}

            {loading && <Spinner color="primary" />}
        </>
    )
}

export default MidPost
