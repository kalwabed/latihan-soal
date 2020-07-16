export const shuffleArray = (array: any[]) =>
    [...array].sort(() => Math.floor(Math.random() + 0.5))
