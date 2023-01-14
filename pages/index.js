import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react"
import Card from "@/components/Card"

export default function Home() {
  const [expansion, setExpansion] = useState('')
  const [cards, setCards] = useState();
  const [isLoaded, setIsLoaded] = useState(null);

  async function getCards(arr) {
    await Promise.all([
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[0]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[1]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[2]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[3]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[4]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[5]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[6]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[7]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[8]}`),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[9]}`),
    ])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        // Log the data to the console
        // You would do something with both sets of data here
        console.log(data);
        setCards(data);
        setIsLoaded(true);
      })
      .catch(function (error) {
        // if there's an error, log it
        console.log(error);
      });
  }

  function getNumbers() {
    setIsLoaded(false)
    let arr = []
    console.log(expansion.total)
    let numberOfCards = expansion.total
    // Get 10 unique numbers in range 1 to n
    while (arr.length < 10) {
      let r = Math.floor(Math.random() * numberOfCards) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    console.log(arr);
    getCards(arr);
  }

  function getSet(expansionId) {
    fetch(`https://api.pokemontcg.io/v2/sets/${expansionId}`)
      .then((responses) => {
        return responses.json()
      })
      .then((data) => {
        setExpansion(data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="App">
      {expansion === '' ? <>
        <h1>Pick an expansion</h1>
        <button onClick={() => { getSet('swsh8') }}>Fusion Strike</button>
        <button onClick={() => { getSet('swsh7') }}>Evolving Skies</button>
      </> : <></>}

      {expansion !== '' ? <>
        <button onClick={() => { setExpansion('') }}>Back</button>
        <h1>{expansion.name}</h1>
        <h1>{expansion.total}</h1>
        <button onClick={getNumbers}>Get cards</button>
        {isLoaded === false && <p>Loading...</p>}
        {isLoaded && (
          <div className={styles.cards}>
            {cards.map((card, index) => {
              return (
                <>
                  <Card
                    src={card.data.images.small}
                    name={card.data.name}
                    price={card.data.tcgplayer.prices.holofoil ? card.data.tcgplayer.prices.holofoil.market : card.data.tcgplayer.prices.normal.market}
                  />
                </>
              );
            })}
          </div>
        )}
      </> : <></>}
    </div>
  );
}
