import React, { useState } from 'react'

import {
    Container,
    Row,
    Col,
    Button,
    Alert,
    Fade,
    Navbar,
    NavbarBrand,
} from 'reactstrap'

import { FetchQuizQuestions } from './API'
import { Difficulty, QuestionAnswer, AnswerObject } from './types'

// components
import DetailCard from './components/DetailCard'
import MidPost from './components/MidPost'
import QuestionCard from './components/QuestionCard'
import AlertUser from './components/AlertUser'

function App() {
    const TOTAL_QUESTION = 1
    const MAX_WRONG = 1
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<QuestionAnswer[]>([])
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const [number, setNumber] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [score, setScore] = useState(0)
    const [wrong, setWrong] = useState(false)
    const [wrongCount, setWrongCount] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)
    // TODO tambahkan alert ketika berhasil 100 skor
    const startTrivia = async () => {
        setLoading(true)
        setScore(0)
        setGameOver(false)
        setNumber(0)
        try {
            const question = await FetchQuizQuestions(Difficulty.EASY, 10)
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
                setIsCorrect(true)
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
        setIsCorrect(false)
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
                    Latihan Soal
                </NavbarBrand>
            </Navbar>
            <Row>
                <Col md={4} sm={4}>
                    {question && !gameOver && (
                        <DetailCard
                            number={number}
                            MAX_WRONG={MAX_WRONG}
                            question={question}
                            isCorrect={isCorrect}
                            wrongCount={wrongCount}
                            score={score}
                        />
                    )}

                    <MidPost
                        resetTrivia={resetTrivia}
                        startTrivia={startTrivia}
                        MAX_WRONG={MAX_WRONG}
                        loading={loading}
                        wrongCount={wrongCount}
                        gameOver={gameOver}
                    />

                    {/* tombol next */}
                    {!loading &&
                        !gameOver &&
                        userAnswer.length === number + 1 &&
                        userAnswer.length !== TOTAL_QUESTION && (
                            <Button
                                onClick={() => {
                                    setNumber(prev => prev + 1)
                                    setIsCorrect(false)
                                }}
                                className="my-2 mx-2"
                                color="success"
                            >
                                <Fade tag="span">Next question</Fade>
                            </Button>
                        )}

                    <AlertUser
                        isCorrect={isCorrect}
                        TOTAL_QUESTION={TOTAL_QUESTION}
                        wrong={wrong}
                        wrongCount={wrongCount}
                        MAX_WRONG={MAX_WRONG}
                        gameOver={gameOver}
                        userAnswer={userAnswer}
                        number={number}
                    />
                </Col>
                <Col md={8} sm={8}>
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
                            Banyak salahnya... maaf, ulang dari awal
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    )
}

export default App
