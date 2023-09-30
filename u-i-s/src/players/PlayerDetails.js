import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

import PlayerCard from "./PlayerCard";
import UpInSportsApi from "../api/api"

function PlayerDetails () {
    const { id } = useParams();
    console.debug("PlayerDetails", "id=", id);
    const [player, setPlayer] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await UpInSportsApi.getPlayer(id);
                setPlayer(res);
                console.log("did we make it this far?")
                console.log(`if teams =: ${player}`);
            } catch (err) {
                console.log(`error ====> ${err}`);
            }
        }
        fetchData();
        setLoading(false);
    }, []);

    
    if (loading) return (<LoadingSpinner />);

    return (
        <div>            
            <PlayerCard id={player.id}
                      firstname={player.name}
                      lastname={player.lastname}
                      
            />
        </div>
    )
};

export default PlayerDetails;