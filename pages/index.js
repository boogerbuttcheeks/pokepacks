import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react"
import Card from "@/components/Card"

export default function Home() {
  const [expansion, setExpansion] = useState('')
  const [cards, setCards] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(null);
  const [value, setValue] = useState(0)
  const [highestValuePack, setHighestValuePack] = useState(0)

  useEffect(() => {
    console.log('useEffectRan')
    if (value > highestValuePack) {
      setHighestValuePack(value)
    }
  }, [value, highestValuePack])

  async function getCards(arr) {
    await Promise.all([
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[0]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[1]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[2]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[3]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[4]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[5]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[6]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[7]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[8]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
      fetch(`https://api.pokemontcg.io/v2/cards/${expansion.id}-${arr[9]}`, {
        headers: {
          'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
        }
      }),
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
        let currentValue = 0
        setCards(data);
        // TCGPlayer gives different prices based on if holofoil, reverse foil, or normal
        // Only focusing on holofoil or not right now
        for (let i = 0; i < data.length; i++) {
          if (data[i].data.tcgplayer.prices.holofoil) {
            let priceOfCard = data[i].data.tcgplayer.prices.holofoil.market
            currentValue += parseFloat(priceOfCard)
          } else {
            let priceOfCard = data[i].data.tcgplayer.prices.normal.market
            currentValue += parseFloat(priceOfCard)
          }
        }
        setValue(currentValue)
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
    let numberOfCards = expansion.total
    // Get 10 unique numbers in range 1 to n
    while (arr.length < 10) {
      let r = Math.floor(Math.random() * numberOfCards) + 1
      if (arr.indexOf(r) === -1) arr.push(r)
    }
    // console.log(arr);
    getCards(arr);
  }

  function getSet(expansionId) {
    fetch(`https://api.pokemontcg.io/v2/sets/${expansionId}`, {
      headers: {
        'X-API-KEY': 'a4f8541e-14df-4ca7-b1af-ce5c12f0a7cc'
      }
    })
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
        <button onClick={getNumbers}>Open pack</button>
        {isLoaded === false && <p>Loading...</p>}
        {highestValuePack === 0 ? <></> : <p>Highest value pack: {highestValuePack}</p>}
        <p>Pack value: {value.toFixed(2)}</p>
        {isLoaded && (
          <div className={styles.cards}>
            {cards.map((card) => {
              return (
                <>
                  <Card
                    name={card.data.name}
                    price={card.data.tcgplayer.prices.holofoil ? card.data.tcgplayer.prices.holofoil.market : card.data.tcgplayer.prices.normal.market}
                    src={card.data.images.small}
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
