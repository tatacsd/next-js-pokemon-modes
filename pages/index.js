import React, { useState, useEffect } from 'react';
import Head from 'next/head'
// import Image from 'next/image' // it will be external
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  // array of pokemons
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // fetching data from api using async function
    async function fetchData() {
      const res = await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
      setPokemons(await res.json()); // set the array of pokemons

    }

    // call the function
    fetchData();
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <div className={styles.header}>
        <h1>Pokemon List</h1>
      </div>
      <div className={styles.grid}>
        {pokemons.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`}>
              <a>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
            </div>
        ))}
      </div>
    </div>
  )
}
