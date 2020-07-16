import React from 'react'
import { Fade, Card, CardTitle } from 'reactstrap'
import { PropsDetail } from '../types'

const DetailCard: React.FC<PropsDetail> = ({
    question,
    score,
    wrongCount,
    MAX_WRONG,
    number,
    difficulty,
    name,
    paket,
}) => {
    return (
        <>
            <Card body outline color="dark" className="my-2">
                <span className="badge badge-primary badge-pill mb-1">
                    {paket === '1'
                        ? 'Latihan'
                        : paket === '2'
                        ? 'Ulangan'
                        : 'Ujian'}
                </span>
                <CardTitle>
                    Name:{' '}
                    <span className="badge badge-secondary">
                        {name === '' ? 'Namanya gak diisi dong' : name}
                    </span>
                </CardTitle>
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
                        <span
                            className={score > 0 ? 'badge badge-success' : ''}
                        >
                            {score}
                        </span>
                    </p>
                    <p>
                        Wrong:{' '}
                        <span
                            className={
                                wrongCount > 0 ? 'badge badge-danger' : ''
                            }
                        >
                            {wrongCount}
                        </span>{' '}
                        / {MAX_WRONG}
                    </p>
                </Fade>
            </Card>
        </>
    )
}

export default DetailCard
