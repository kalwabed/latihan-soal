import React from 'react'
import { Card, CardHeader, Button, Fade, CardTitle } from 'reactstrap'
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
            <Card body outline color="dark" className="my-2">
                <CardTitle className="text-center">
                    <span className="badge badge-primary">
                        question: {questionNr} from {totalQuestions}
                    </span>
                </CardTitle>
                <CardHeader>
                    <Fade>
                        <p dangerouslySetInnerHTML={{ __html: question }}></p>
                    </Fade>
                </CardHeader>
                <Card body outline color="success" className="text-center">
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
                </Card>
            </Card>
        </>
    )
}

export default QuestionCard
