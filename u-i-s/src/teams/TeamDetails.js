import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CardColumns } from "reactstrap";
import Alert from "../common/Alert";

import LoadingSpinner from "../common/LoadingSpinner";

import TeamCard from "./TeamCard";
import UpInSportsApi from "../api/api"

function TeamDetails () {
    const { code } = useParams();
    console.debug("TeamDetails", "code=", code);
    const [team, setTeam] = useState({});
    const [loading, setLoading] = useState(true);
    // const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await UpInSportsApi.getTeam(code);
                setTeam(res);
                console.log("did we make it this far?")
                console.log(`if teams =: ${team}`);
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
            <TeamCard id={team.id}
                      name={team.name}
                      nickname={team.nickname}
                      code={team.code}
                      city={team.city}
                      logo={team.logo}
                      nbaFranchise={team.nbaFranchise}
            />
        </div>
    )
};

export default TeamDetails;