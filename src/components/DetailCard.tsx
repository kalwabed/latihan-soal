import React from 'react'
import { Fade, Card, CardTitle } from 'reactstrap'
import { PropsDetail } from '../types'

const DetailCard: React.FC<PropsDetail> = ({
    question,
    score,
    isCorrect,
    wrongCount,
    MAX_WRONG,
    number,
    difficulty,
}) => (
    <>
        <Card body outline color="dark" className="my-2">
            <CardTitle>
                Category:{' '}
                <span className="badge badge-info">
                    {question[number]?.category}
                </span>
            </CardTitle>
            <CardTitle>
                Difficulty:{' '}
                <span
                    className={
                        difficulty === 'easy'
                            ? 'badge badge-primary'
                            : difficulty === 'medium'
                            ? 'badge badge-warning'
                            : difficulty === 'hard'
                            ? 'badge badge-danger'
                            : ''
                    }
                >
                    {difficulty}
                </span>
            </CardTitle>
            <Fade>
                <p>
                    Poin: {'  '}
                    <span className={score > 0 ? 'badge badge-success' : ''}>
                        {score}
                    </span>
                </p>
                <p>
                    Wrong:{' '}
                    <span
                        className={wrongCount > 0 ? 'badge badge-danger' : ''}
                    >
                        {wrongCount}
                    </span>{' '}
                    / {MAX_WRONG}
                </p>
            </Fade>
        </Card>
    </>
)

export default DetailCard
