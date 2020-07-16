import { Question } from './types'
import { shuffleArray } from './utils'

export const FetchQuizQuestions = async (
    difficulty: String | undefined,
    TOTAL_QUESTION: number,
    category: any = 9
): Promise<any> => {
    const endpoint = `https://opentdb.com/api.php?amount=${TOTAL_QUESTION}&difficulty=${difficulty}&type=multiple&category=${category}`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((qs: Question) => ({
        ...qs,
        answers: shuffleArray([...qs.incorrect_answers, qs.correct_answer]),
    }))
}

export const FetchCategory = async () => {
    const endpoint = 'https://opentdb.com/api_category.php'
    const data = await (await fetch(endpoint)).json()
    return data.trivia_categories.map((tri: any) => tri)
}
