import React from 'react'
import { Button, Spinner, Fade } from 'reactstrap'
import { PropsMid } from '../types'

const MidPost: React.FC<PropsMid> = ({
    gameOver,
    startTrivia,
    wrongCount,
    MAX_WRONG,
    loading,
    resetTrivia,
    TOTAL_QUESTION,
    number,
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
                <Button color="dark" className="my-1" onClick={resetTrivia}>
                    <Fade tag="span">
                        {wrongCount === MAX_WRONG ||
                        number + 1 === TOTAL_QUESTION
                            ? 'New Game'
                            : 'Restart'}
                    </Fade>
                </Button>
            )}

            {loading && <Spinner type="grow" size="lg" color="primary" />}
        </>
    )
}

export default MidPost
