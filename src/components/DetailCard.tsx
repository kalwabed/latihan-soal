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
}) => (
    <>
        <Card body outline color="dark" className="my-2">
            <CardTitle>
                Category:{' '}
                <span className="text-info">{question[number]?.category}</span>
            </CardTitle>
            <Fade>
                <p>
                    Score: {'  '}
                    <span className={isCorrect ? 'badge badge-success' : ''}>
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
