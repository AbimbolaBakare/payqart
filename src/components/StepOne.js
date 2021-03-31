import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmploymentAction } from '../redux/actions/actionCreators';
import { fetchEmploymentTypes } from '../services/employmentService';


export const StepOne = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const employment_types = useSelector(state => state.employmentTypesReducer.data)

    // Function to getOrders
    const getEmploymentTypes = async () => {
        setIsLoading(true);
        await fetchEmploymentTypes().then((res) => {
            setIsLoading(false)
            dispatch(fetchEmploymentAction(res.data));
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    };

    useEffect(() => {
        getEmploymentTypes();
    }, []);

    function proceed() {
        if (props.employment === '') {
            alert('Please select employment type')
        } else {
            props.goToStep(2)
        }
    }


    return (
        <div>
            <h4 className='font-weight-bold' style={{ color: '#b6038c' }}> What Do You Do?</h4>
            {isLoading && 'Please wait'}

            {employment_types.length !== 0 && (
                <div className='container'>
                    <div className='row'>
                        {employment_types.map((data, i) => {
                            return (
                                <div className='col-md-4' key={i}>
                                    <div className='order-box' style={{ cursor: 'pointer' }} onClick={() => props.changeEmployment(data.id)}>
                                        {data.name === 'Corporate Organization' ?
                                            (
                                                <img src='/images/building.svg' className='img-fluid' alt='occupation' />
                                            )
                                            :
                                            data.name === 'Self Employed/Freelance' ?
                                                (
                                                    <img src='/images/freelancer.svg' className='img-fluid' alt='occupation' />
                                                )
                                                :
                                                (
                                                    <img src='/images/paid.svg' className='img-fluid' alt='occupation' />
                                                )

                                        }
                                    </div>
                                    <p className='payqart-purple'>{data.name}</p>
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
            )}


            <div className='text-left mt-4'>
                <h5 className='payqart-purple'>How much do you get paid monthly?</h5>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{ background: '#B6038C', color: '#fff' }} id="basic-addon1">N</span>
                    </div>
                    <input type="number" className='form-control' placeholder="Monthly salary" value={props.salary} onChange={props.changeSalary} />
                </div>
            </div>
            <div className='text-left mt-4'>
                <h5 className='payqart-purple'>When is your next salary date</h5>
                <input className='form-control' type="date" name='date' value={props.date} onChange={props.changeDate} />
            </div>

            <div className='text-left mt-4'>
                <h5 className='payqart-purple'>Do you have any existing loans</h5>
                <div className='form-control'>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="existing" value="yes" onChange={props.changeExisting} />
                        <label className="form-check-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input " type="radio" name="existing" value="no" onChange={props.changeExisting} />
                        <label className="form-check-label">No</label>
                    </div>

                </div>

            </div>

            <div className='mt-5'>
                <button className='btn payqart-purple' style={{ border: '2px solid #b6038c', borderRadius: '20px'}} onClick={proceed}>Continue</button>
            </div>

        </div>
    )
}
