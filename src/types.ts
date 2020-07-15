export enum Difficulty {
    EASY = 'easy',
    Medium = 'medium',
    HARD = 'hard',
}

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
    isCorrect: boolean
    question: any[]
    score?: number
    wrongCount: number
    MAX_WRONG?: number
    number: number
}
