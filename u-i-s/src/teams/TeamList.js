import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpInSportsApi from "../api/api";
import TeamCard from "./TeamCard";
import { CardColumns } from "reactstrap";
import LoadingSpinner from "../common/LoadingSpinner";


function TeamList() {
    console.debug("TeamList");

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await UpInSportsApi.getAllTeams('teams');
                setTeams(res);
                console.log("did we make it this far?")
                console.log(`if teams =: ${teams}`);
            } catch (err) {
                console.log(`error ====> ${err}`);
            }
        }
        fetchData();
        setLoading(false);
    }, []);

    // async function fetchData() {
    //     let res = await UpInSportsApi.getAllTeams();
    //     console.debug("use effect TeamList:", res.data);
    //     setTeams(res.data);
                
    // }

        

    if(loading) return (<LoadingSpinner />)

    return (
        <div>
            {teams.length > 0
                ? (
                    <CardColumns>
                    <div> 
                        {teams.map(t => (
                            <Link to={`/teams/${t.code}`}>
                            <TeamCard 
                                key={t.code}
                                code={t.code}
                                name={t.team}
                                nickname={t.nickname}
                                city={t.city}
                                logo={t.logo}
                                nbaFranchise={t.nbaFranchise} 
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

export default TeamList;