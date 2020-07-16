import React, { useState, useEffect } from 'react'

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
import { FetchQuizQuestions, FetchCategory } from './API'
import { QuestionAnswer, AnswerObject } from './types'

// components
import DetailCard from './components/DetailCard'
import MidPost from './components/MidPost'
import QuestionCard from './components/QuestionCard'
import AlertUser from './components/AlertUser'
import UserForm from './components/UserForm'

function App() {
    const [totalQuestion, setTotalQuestion] = useState(10)
    const [maxWrong, setMaxWrong] = useState(10)
    const [loading, setLoading] = useState<boolean>(false)
    const [question, setQuestion] = useState<QuestionAnswer[]>([])
    const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
    const [paket, setPaket] = useState('')
    const [name, setName] = useState<string>('')
    const [listCategory, setListCategory] = useState<any[]>([])
    const [difficulty, setDifficulty] = useState<string>('')
    const [number, setNumber] = useState(0)
    const [gameOver, setGameOver] = useState(true)
    const [score, setScore] = useState(0)
    const [wrong, setWrong] = useState(false)
    const [wrongCount, setWrongCount] = useState(0)
    const [isCorrect, setIsCorrect] = useState(false)

    useEffect(() => {
        async function fetchCategory() {
            const data = await FetchCategory()
            setListCategory(data)
        }
        fetchCategory()
    }, [])

    const startTrivia = async () => {
        // inputan
        const dif = (document.querySelector(
            'input[name=difficulty]:checked'
        ) as HTMLInputElement).value
        const username = (document.querySelector(
            '.username'
        ) as HTMLInputElement).value
        const category = (document.querySelector(
            '.category'
        ) as HTMLInputElement).value
        const paket = (document.querySelector(
            'input[name=paket]:checked'
        ) as HTMLInputElement).value

        if (paket === '2') {
            setMaxWrong(prev => prev + 10)
            setTotalQuestion(prev => prev + 10)
        } else if (paket === '3') {
            setMaxWrong(prev => prev + 30)
            setTotalQuestion(prev => prev + 30)
        }

        setPaket(paket)
        setName(username)
        setLoading(true)
        setDifficulty(dif)
        setScore(0)
        setGameOver(false)
        setNumber(0)
        try {
            const question = await FetchQuizQuestions(difficulty, 10, category)
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
        setMaxWrong(10)
        setTotalQuestion(10)
        setScore(0)
        setUserAnswer([])
        setWrongCount(0)
        setLoading(false)
    }

    return (
        <Container>
            <Navbar color="dark" expand="md" dark>
                <NavbarBrand href="#" className="m-auto">
                    <i className="devicon-react-plain"></i> kuis {'  '}
                    <i className="devicon-typescript-plain"></i>
                </NavbarBrand>
            </Navbar>
            <Row>
                <Col md={4} sm={4}>
                    {gameOver && number === 0 && (
                        <Fade>
                            <UserForm category={listCategory} />
                        </Fade>
                    )}

                    {question && !gameOver && (
                        <Fade>
                            <DetailCard
                                paket={paket}
                                difficulty={difficulty}
                                number={number}
                                MAX_WRONG={maxWrong}
                                question={question}
                                name={name}
                                wrongCount={wrongCount}
                                score={score}
                            />
                        </Fade>
                    )}

                    <MidPost
                        number={number}
                        TOTAL_QUESTION={totalQuestion}
                        resetTrivia={resetTrivia}
                        startTrivia={startTrivia}
                        MAX_WRONG={maxWrong}
                        loading={loading}
                        wrongCount={wrongCount}
                        gameOver={gameOver}
                    />

                    {/* tombol next */}
                    {!loading &&
                        !gameOver &&
                        userAnswer.length === number + 1 &&
                        userAnswer.length !== totalQuestion && (
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
                        TOTAL_QUESTION={totalQuestion}
                        wrong={wrong}
                        wrongCount={wrongCount}
                        MAX_WRONG={maxWrong}
                        gameOver={gameOver}
                        userAnswer={userAnswer}
                        number={number}
                        name={name === '' ? 'tanpa nama' : name}
                    />
                </Col>

                <Col md={8} sm={8}>
                    {wrongCount !== maxWrong && !loading && !gameOver && (
                        <QuestionCard
                            questionNr={number + 1}
                            callback={checkAnswer}
                            question={question[number].question}
                            answers={question[number].answers}
                            userAnswer={userAnswer ? userAnswer[number] : false}
                            totalQuestions={totalQuestion}
                        />
                    )}
                </Col>
            </Row>
            <hr />
            <footer>
                <h3>
                    <a href="https://github.com/kaliwa/latihan-soal">
                        <i className="devicon-github-plain-wordmark"></i>
                    </a>
                </h3>
            </footer>
        </Container>
    )
}

export default App
