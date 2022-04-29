import { useRouter } from "next/router" // to get the id from the mapping
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/Details.module.css';


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
        return <div>No pokemon</div>
    }



    return <div>
        <head>
            <title>{pokemon.name}</title>
        </head>
        <div>
            <Link href="/">
                <a>Back to list</a>
            </Link>
        </div>
        <div className={styles.layout}>
            <div >
                <img 
                className={styles.image}
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
            </div>
            <div>
                <div className={styles.name}>{pokemon.name}</div>
                <div className={styles.type}>{pokemon.type.join(', ')}</div>
                <table>
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
}
