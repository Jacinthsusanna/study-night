// Shuffles the flashcards using the Fisher-Yates algorithm.
// Returns a new array and leaves the original untouched.
const shuffle = (cards) => {
  let current = cards.length;
  const newCardsArray = [...cards];

  while (current !== 0) {
    const randomIndex = Math.floor(Math.random() * current);
    current--;

    [newCardsArray[current], newCardsArray[randomIndex]] = [
      newCardsArray[randomIndex],
      newCardsArray[current],
    ];
  }
  return newCardsArray;
};

export { shuffle };
