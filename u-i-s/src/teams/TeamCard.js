import React from "react";
import { Card, CardBody, CardTitle, CardText, CardSubtitle, CardImg, Button } from "reactstrap";

function TeamCard({ id, name, nickname, code, city, logo, nbaFranchise }) {
    return (
        <Card>
            <CardImg 
            alt="Team image cap"
            src={logo}
            top
            width="30%"
            height="30%"
            />
            <CardBody>
                <CardTitle tag="h5">
                    {name}
                </CardTitle>
                <CardSubtitle>
                    {nickname}
                </CardSubtitle>
                <CardText>
                    Representing the city of {city} 
                </CardText>
                <Button>
                    {code}
                </Button>
            </CardBody>
        </Card>
    )
};




export default TeamCard;
