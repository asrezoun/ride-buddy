import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import riderData from '../../fakeData/data.json';
import SimpleMap from '../SimpleMap/SimpleMap';
import './RideDetails.css'

const RideDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [riders, setRider] = useState([]);

    useEffect(() => {
        setRider(riderData);
        //console.log(riderData);
    }, []);

    const data = riders.filter((ride) => ride.id == id)
    console.log(data);

    const { register, handleSubmit, watch, errors } = useForm();
    const [flag, setFlag] = useState(true);
    const [pick, setPick] = useState({});
    const onSubmit = data => {
        console.log(data);
        setFlag(false);
        setPick(data);
    }
    return (
        <div className="container">
            <div className="row" >
                <div className="col-md-3 leftBlock">
                    {flag ? <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <label htmlFor="pickFrom">Pick up point:</label>
                        <input name="pickFrom" placeholder="Pick From" ref={register({ required: true })} />
                        {errors.pickFrom && <span className="error">This field is required</span>}
                        <label htmlFor="pickTo">Destination:</label>
                        <input name="pickTo" placeholder="Pick to" ref={register({ required: true })} />
                        {errors.pickTo && <span className="error">This field is required</span>}
                        <label for="start">Start date:</label>

                        <input type="date" id="start" name="trip-start"
                            value="2021-03-21"
                            min="2021-03-21" max="2021-12-31" ref={register({ required: true })}></input>
                        <input type="submit" />
                    </form>
                        :
                        <div>
                            <div style={{ backgroundColor: 'orange', padding: '5px', borderRadius: '5px' }}>
                                <h6>From: {pick.pickFrom}</h6>
                                <h6>To: {pick.pickTo}</h6>
                            </div>

                            <div className="car">
                                <img src={data[0].img} style={{ width: '20%', padding: '5px' }} alt="" />
                                <p className="car-insight">{data[0].name}</p>
                                <p className="car-insight">sit: {data[0].sit}</p>
                                <p className="car-insight">$100</p>

                            </div>
                        </div>

                    }
                </div>
                <div className="col-md-9">
                    <SimpleMap></SimpleMap>
                </div>

            </div>
        </div>
    );
};

export default RideDetails;