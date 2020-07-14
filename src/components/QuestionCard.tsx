import React from 'react'
import { Card, CardBody, CardHeader, Button, Fade } from 'reactstrap'
import { Props } from '../types'

const QuestionCard: React.FC<Props> = ({
    question,
    questionNr,
    totalQuestions,
    callback,
    answers,
    userAnswer,
}) => {
    const correct = userAnswer?.correctAnswer
    const isClick = userAnswer?.answer
    return (
        <>
            <Card className="mt-2">
                {questionNr} / {totalQuestions}
                <CardHeader>
                    <Fade>
                        <p dangerouslySetInnerHTML={{ __html: question }}></p>
                    </Fade>
                </CardHeader>
                <CardBody className="text-center">
                    {answers.map((answer, i) => (
                        <Button
                            disabled={!!userAnswer}
                            key={answer}
                            value={answer}
                            onClick={callback}
                            color={
                                correct === answer
                                    ? 'success'
                                    : !correct && isClick === answer
                                    ? 'danger'
                                    : 'light'
                            }
                            className="mx-2 my-2"
                        >
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: `${i + 1}. ${answer}`,
                                }}
                            ></span>
                        </Button>
                    ))}
                </CardBody>
            </Card>
        </>
    )
}

export default QuestionCard
