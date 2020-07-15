import { Question } from './types'
import { shuffleArray } from './utils'

export const FetchQuizQuestions = async (
    difficulty: String | undefined,
    TOTAL_QUESTION?: number
): Promise<any> => {
    const endpoint = `https://opentdb.com/api.php?amount=${TOTAL_QUESTION}&difficulty=${difficulty}&type=multiple`
    const data = await (await fetch(endpoint)).json()
    return data.results.map((qs: Question) => ({
        ...qs,
        answers: shuffleArray([...qs.incorrect_answers, qs.correct_answer]),
    }))
}
