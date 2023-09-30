import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpInSportsApi from "../api/api";
import PlayerCard from "./PlayerCard";
import { CardColumns } from "reactstrap";
import LoadingSpinner from "../common/LoadingSpinner";


function PlayerList() {
    console.debug("PlayerList");

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await UpInSportsApi.getAllPlayers('players');
                setPlayers(res);
                console.log("did we make it this far?")
                console.log(`if players =: ${players}`);
            } catch (err) {
                console.log(`error ====> ${err}`);
            }
        }
        fetchData();
        setLoading(false);
    }, []);

    

        

    if(loading) return (<LoadingSpinner />)

    return (
        <div>
            {players.length > 0
                ? (
                    <CardColumns>
                    <div> 
                        {players.map(p => (
                            <Link to={`/players/${p.id}`}>
                            <PlayerCard 
                                key={p.id}
                                firstname={p.firstname}
                                lastname={p.lastname}
                                nba={p.nba} 
                            />
                            </Link>
                        ))}
                    </div>
                    </CardColumns>
                ) : (
                    <p> Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default PlayerList;