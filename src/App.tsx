import React, { useState } from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Alert,
    Spinner,
    Fade,
    Navbar,
    NavbarBrand,
} from 'reactstrap'

import fetchQuiz from './API'
// components
import QuestionCard from './components/QuestionCard'
import { Difficulty, QuestionAnswer, AnswerObject } from './types'

function App() {
    const TOTAL_QUESTION = 10
    const MAX_WRONG = 5
    const [name, setName] = useState('kalwabed')
    const [loading, setLoading] = useState(false)
    const [question, setQuestion] = useState<QuestionAnswer[]>([])
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const [number, setNumber] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [score, setScore] = useState(0)
    const [wrong, setWrong] = useState(false)
    const [wrongCount, setWrongCount] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)

    const startTrivia = async () => {
        setLoading(true)
        setScore(0)
        setGameOver(false)
        setNumber(0)
        try {
            const question = await fetchQuiz(Difficulty.EASY, 10)
            setQuestion(question)
        } catch (err) {
            console.error(err)
        }
        setLoading(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value
            const correct = question[number].correct_answer === answer
            if (correct) {
                setWrong(false)
                setScore(prev => prev + 10)
                const answerObj: AnswerObject = {
                    answer,
                    correct,
                    question: question[number].question,
                    correctAnswer: question[number].correct_answer,
                }
                setUserAnswer(prev => [...prev, answerObj])
            } else {
                setWrong(true)
                setWrongCount(prev => prev + 1)
            }
        }
    }

    const resetTrivia = () => {
        setLoading(true)
        setGameOver(true)
        setNumber(0)
        setQuestion([])
        setScore(0)
        setUserAnswer([])
        setWrongCount(0)
        setLoading(false)
    }

    return (
        <Container>
            <Navbar color="dark" expand="md" dark>
                <NavbarBrand href="#" className="m-auto">
                    Kaliwa Quizz
                </NavbarBrand>
            </Navbar>
            <Row>
                <Col xs="auto">
                    <p>Name: Kalwabed</p>
                    {question && !gameOver && (
                        <Fade>
                            <p>Score: {score}</p>
                            <p>
                                Wrong: {wrongCount} / {MAX_WRONG}
                            </p>
                        </Fade>
                    )}

                    {gameOver && <Button onClick={startTrivia}>Start</Button>}

                    {wrongCount !== MAX_WRONG &&
                        wrongCount >= 1 &&
                        wrong &&
                        !gameOver && (
                            <Alert color="danger" className="my-2">
                                Salah lur
                            </Alert>
                        )}

                    {!wrong && !gameOver && userAnswer.length > number && (
                        <Alert color="success" className="my-2">
                            Bener....
                        </Alert>
                    )}

                    {!gameOver && !loading && (
                        <Button onClick={resetTrivia}>New game</Button>
                    )}

                    {!loading &&
                        !gameOver &&
                        userAnswer.length === number + 1 &&
                        userAnswer.length !== TOTAL_QUESTION && (
                            <Button
                                onClick={() => setNumber(prev => prev + 1)}
                                className="my-2 mx-2"
                            >
                                Next question
                            </Button>
                        )}

                    {loading && <Spinner color="primary" />}

                    {wrongCount !== MAX_WRONG && !loading && !gameOver && (
                        <QuestionCard
                            questionNr={number + 1}
                            callback={checkAnswer}
                            question={question[number].question}
                            answers={question[number].answers}
                            userAnswer={userAnswer ? userAnswer[number] : false}
                            totalQuestions={TOTAL_QUESTION}
                        />
                    )}

                    {wrongCount === MAX_WRONG && (
                        <Alert color="danger" className="my-2">
                            Banyak salahnya... {name} ulang dari awal
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default App
