import React from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle } from "reactstrap";

function PlayerCard({ id, firstname, lastname }) {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {firstname} {lastname}
                </CardTitle>
                <CardSubtitle>
                    Get More Info for player
                </CardSubtitle>
                <CardText>
                    Load player stats
                </CardText>                
            </CardBody>
        </Card>
    )
};




export default PlayerCard;
