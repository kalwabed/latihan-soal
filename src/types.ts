export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: []
    question: string
    type: string
}

export type Props = {
    callback: any
    userAnswer: any
    question: string
    answers: any[]
    questionNr: number
    totalQuestions: number
}

export type QuestionAnswer = Question & { answers: [] }

export type AnswerObject = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
}

export type PropsDetail = {
    question: any[]
    score: number
    wrongCount: number
    MAX_WRONG?: number
    number: number
    difficulty: string
    name: string
}

export type PropsMid = {
    gameOver: boolean
    startTrivia: any
    wrongCount: number
    resetTrivia: any
    MAX_WRONG: number
    loading: boolean
    number: number
    TOTAL_QUESTION: number
}

export type PropsAlert = {
    wrongCount: number
    wrong: boolean
    gameOver: boolean
    MAX_WRONG: number
    userAnswer: any[]
    number: number
    isCorrect: boolean
    TOTAL_QUESTION: number
}
