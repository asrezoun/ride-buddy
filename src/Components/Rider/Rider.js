import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Rider = (props) => {
    const{id,name,img}=props.rideDetails;
    console.log(props);

    const history = useHistory();
    const showRideDetails= (rideId) =>{
        const url = `rideDetails/${rideId}`;
        history.push(url);
    }
    return (
        <div className="col-md-3 pt-5" onClick={()=>showRideDetails(id)}>
            <Card style={{ width: '15rem', height: '15rem', padding:'10px' }}>
                <Card.Img variant="top" src={img} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>   
                </Card.Body>
            </Card>
        </div>
    );
};

export default Rider;