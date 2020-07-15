export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.floor(Math.random() * array.length))
