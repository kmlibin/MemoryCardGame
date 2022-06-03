
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './Components/SingleCard';

const cardImages = [
  
  { src: "../public/images/helmet.jpg", matched: false },
  { src: "../public/images/potion.jpg", matched: false },
  { src: "../public/images/ring.jpg", matched: false },
  { src: "../public/images/scroll.jpg", matched: false },
  { src: "../public/images/shield.jpg", matched: false },
  { src: "../public/images/sword.jpg", matched: false },
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //double and shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]

      .sort(() => Math.random() - 0.5)
      .map((prev) => ({ ...prev, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }

  // handle choice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  //compare two cards

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prev => {
          return prev.map(card => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])


  //reset and increase turn count
  function resetTurn() {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prev => prev + 1)
    setDisabled(false)
  }

  // starts game upon load
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
