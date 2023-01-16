import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react"
import Card from "@/components/Card"
import useSWR from 'swr'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/staticdata', fetcher);

  const [expansion, setExpansion] = useState('')
  const [cards, setCards] = useState([{}]);
  const [isLoaded, setIsLoaded] = useState(null);
  const [value, setValue] = useState(0)
  const [highestValuePack, setHighestValuePack] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalSrc, setModalSrc] = useState()

  useEffect(() => {
    // console.log('useEffectRan')
    if (value > highestValuePack) {
      setHighestValuePack(value.toFixed(2))
      console.log('New best pack!')
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
    let x = JSON.parse(data)

    let common = x[`${expansion.id}`][`common`]
    let commonArr = []
    let uncommon = x[`${expansion.id}`][`uncommon`]
    let uncommonArr = []

    let nonholo = x[`${expansion.id}`][`nonholo`]
    let holo = x[`${expansion.id}`][`holo`]
    let v = x[`${expansion.id}`][`v`]
    let vmax = x[`${expansion.id}`][`vmax`]
    let vfa = x[`${expansion.id}`][`vfa`]
    let trainer = x[`${expansion.id}`][`trainer`]
    let gold = x[`${expansion.id}`][`gold`]
    let rainbow = x[`${expansion.id}`][`rainbow`]
    let valt = x[`${expansion.id}`][`valt`]
    let vmaxalt = x[`${expansion.id}`][`vmaxalt`]

    // Get 6 commons
    while (commonArr.length < 6) {
      let r = Math.floor(Math.random() * common.length)
      if (commonArr.indexOf(r) === -1) commonArr.push(common[r])
      // console.log(common)
      // console.log(r)
      // console.log(common[r])
    }
    for (let i in commonArr) {
      arr.push(commonArr[i])
    }

    // Get 3 uncommons
    while (uncommonArr.length < 3) {
      let r = Math.floor(Math.random() * uncommon.length)
      if (uncommonArr.indexOf(r) === -1) uncommonArr.push(uncommon[r])
      // console.log(uncommon)
      // console.log(r)
      // console.log(uncommon[r])
    }
    for (let i in uncommonArr) {
      arr.push(uncommonArr[i])
    }

    let hitNum = (Math.random()).toFixed(2) * 100
    if (hitNum <= 22) {
      let r = Math.floor(Math.random() * nonholo.length)
      arr.push(nonholo[r])
    } else if (hitNum <= 43) {
      let r = Math.floor(Math.random() * holo.length)
      arr.push(holo[r])
    } else if (hitNum <= 58) {
      let r = Math.floor(Math.random() * v.length)
      arr.push(v[r])
    } else if (hitNum <= 68) {
      let r = Math.floor(Math.random() * vmax.length)
      arr.push(vmax[r])
    } else if (hitNum <= 76) {
      let r = Math.floor(Math.random() * vfa.length)
      arr.push(vfa[r])
    } else if (hitNum <= 84) {
      let r = Math.floor(Math.random() * trainer.length)
      arr.push(trainer[r])
    } else if (hitNum <= 89) {
      let r = Math.floor(Math.random() * gold.length)
      arr.push(gold[r])
    } else if (hitNum <= 94) {
      let r = Math.floor(Math.random() * rainbow.length)
      arr.push(rainbow[r])
    } else if (hitNum <= 98) {
      let r = Math.floor(Math.random() * valt.length)
      arr.push(valt[r])
    } else {
      let r = Math.floor(Math.random() * vmaxalt.length)
      arr.push(vmaxalt[r])
    }

    // console.log(arr)
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

  function showModal(src) {
    setIsModalVisible(true)
    setModalSrc(src)
    return <>
    </>
  }

  if (error) return <div>Failed to load</div>;

  return (
    <div className="App">
      {expansion === '' ? <>
        <h1>Pick an expansion</h1>
        <button onClick={() => { getSet('swsh8') }}>Fusion Strike</button>
        <button onClick={() => { getSet('swsh7') }}>Evolving Skies</button>
      </> : <></>}

      {isModalVisible ? <div
        className={styles.modalWrapper}
        onClick={() => { setIsModalVisible(false) }}>
        <div className={styles.modal}>
          <img src={modalSrc} alt='test' />
        </div>
      </div> : <></>}

      {expansion !== '' ? <>
        <button onClick={() => {
          setExpansion('')
          setCards([{}])
          setValue(0)
          setIsLoaded(null)
        }}>Back</button>
        <h1>{expansion.name}</h1>
        <button onClick={getNumbers}>Open pack</button>
        {isLoaded === false && <p>Loading...</p>}
        {highestValuePack === 0 ? <></> : <p>Highest value pack: ${highestValuePack} USD</p>}
        <p>Pack value: ${value.toFixed(2)} USD</p>
        <h1>{data['record']}</h1>
        {isLoaded && (
          <div className={styles.cards}>
            {cards.map((card) => {
              return (
                <>
                  <Card
                    name={card.data.name}
                    price={card.data.tcgplayer.prices.holofoil ? card.data.tcgplayer.prices.holofoil.market : card.data.tcgplayer.prices.normal.market}
                    src={card.data.images.small}
                    largeSrc={card.data.images.large}
                    handleClick={showModal}
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
