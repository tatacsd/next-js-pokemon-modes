import { useRouter } from "next/router" // to get the id from the mapping
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';
import Image from 'next/image';


export default function PokemonDetails() {
    // get the id from the query
    const { query: { id } } = useRouter();

    // get the pokemon data from the api
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`);
            setPokemon(await res.json());
        }

        if (id) {
            fetchData();
        }
    }, [id])

    if (!pokemon) {
        // return a gif loading...
        return <div className={styles.loading}>
            <Image src="/loading.gif" alt="back" width={300} height={300} />
        </div>
    }



    return <div>
        <head>
            <title>{pokemon.name}</title>
        </head>
        <div>
            <Link href="/">
                <Image
                    className={styles.back}
                    src="/back.png" alt="back" width={50} height={50} />
            </Link>
        </div>
        <div className={styles.container}>
            <div className={styles.layout}>
                <div >
                    <img
                        className={styles.image}
                        src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>{pokemon.name}</div>
                    <div className={styles.type}>{pokemon.type.join(', ')}</div>
                    <table className={styles.table}>
                        <thead className={styles.header}>
                            <tr>
                                <th>Name</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pokemon.stats.map((stat) => (
                                <tr key={stat.name}>
                                    <td className={styles.attributes}>{stat.name}</td>
                                    <td>{stat.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
