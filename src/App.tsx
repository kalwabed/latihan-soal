import React, { useState } from 'react'

import {
    Container,
    Row,
    Col,
    Button,
    Fade,
    Navbar,
    NavbarBrand,
} from 'reactstrap'
// TODO inputan nama pengguna dan kategori pilihan
import { FetchQuizQuestions } from './API'
import { QuestionAnswer, AnswerObject } from './types'

// components
import DetailCard from './components/DetailCard'
import MidPost from './components/MidPost'
import QuestionCard from './components/QuestionCard'
import AlertUser from './components/AlertUser'
import UserForm from './components/UserForm'

function App() {
    const TOTAL_QUESTION = 10
    const MAX_WRONG = 10
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<QuestionAnswer[]>([])
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const [name, setName] = useState<string>('')
    const [difficulty, setDifficulty] = useState<string>('')
    const [number, setNumber] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [score, setScore] = useState(0)
    const [wrong, setWrong] = useState(false)
    const [wrongCount, setWrongCount] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)

    const startTrivia = async () => {
        const dif = (document.querySelector(
            'input[name=difficulty]:checked'
        ) as HTMLInputElement).value
        const username = (document.querySelector(
            '.username'
        ) as HTMLInputElement).value
        setName(username)
        setLoading(true)
        setDifficulty(dif)
        setScore(0)
        setGameOver(false)
        setNumber(0)
        try {
            const question = await FetchQuizQuestions(difficulty, 10)
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
        setName('')
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
                    {gameOver && number === 0 && (
                        <Fade>
                            <UserForm />
                        </Fade>
                    )}

                    {question && !gameOver && (
                        <DetailCard
                            difficulty={difficulty}
                            number={number}
                            MAX_WRONG={MAX_WRONG}
                            question={question}
                            name={name}
                            wrongCount={wrongCount}
                            score={score}
                        />
                    )}

                    <MidPost
                        number={number}
                        TOTAL_QUESTION={TOTAL_QUESTION}
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
                                className="my-1 mx-2"
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
                </Col>
            </Row>
        </Container>
    )
}

export default App
