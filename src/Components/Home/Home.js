import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import riderData from '../../fakeData/data.json';
import Rider from '../Rider/Rider';
import './Home.css'
const Home = () => {

    const [riders, setRider] = useState([]);

    useEffect(() => {
        setRider(riderData);
        //console.log(riderData);
    }, []);

    //console.log(rider[0]);
    return (
        <div className="bg" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('https://i.ibb.co/XFfcB8G/Bg.png')` }}>
            <div className="container">
                <div className="row">
                    {
                        riders.map(ride => <Rider rideDetails={ride} key={ride.id}></Rider>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;