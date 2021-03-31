import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlans } from '../services/repaymentService';
import { fetchPlansAction } from '../redux/actions/actionCreators';
import { numberFormatter } from './numberFormatter';


export const StepTwo = (props) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const plans = useSelector(state => state.plansReducer.data)

    // Function to getOrders
    const getEmploymentTypes = async () => {
        setIsLoading(true);
        await fetchPlans().then((res) => {
            setIsLoading(false)
            dispatch(fetchPlansAction(res.data));
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
        })
    };

    useEffect(() => {
        getEmploymentTypes();
    }, []);

    return (
        <div>
            <h4 className='font-weight-bold payqart-purple'> Choose Your Plan</h4>
            {isLoading && 'Please wait'}

            {plans.length !== 0 && (
                <div className='container mt-5'>
                    <div className='row'>
                        {plans.map((data, i) => {
                            return (
                                <div className='col-md-2 mb-5' key={i} onClick={() => { props.changeRepayment(data.id) }}>
                                    <div style={{ backgroundColor: 'red', borderRadius: '10px 10px 0px 0px', height: '10px' }}></div>
                                    <div className='month-box'>
                                        <h2> {data.months}</h2>
                                        <span>months</span>
                                    </div>
                                </div>
                            )
                        })

                        }
                    </div>
                </div>
            )}

            <div className='container-fluid mt-5'>
                <h4 className='payqart-purple font-weight-bolder'>Payment Breakdown</h4>
                {props.breakdown.length === 0 ?
                    (
                        <p>Click on a month above to proceed</p>
                    )
                    :
                    (
                        <>
                            {props.breakdown.paymentBreakdown && (
                                <div className='order-box order-box2 payqart-purple'>
                                    <div className='row'>
                                        <div className='col-lg-3 ml-3 text-left mt-3'>
                                            <p>Shopping Credit</p>
                                            <p>Down Payment</p>
                                            <p>Monthly Installment</p>
                                            <p>Tenure</p>
                                        </div>
                                        <div className='col-lg-1' style={{ borderRight: '2px solid purple' }}></div>
                                        <div className='col-lg-3 font-weight-bolder mt-3'>
                                            <p>&#8358; {numberFormatter(props.breakdown.paymentBreakdown.shoppingCredit)}</p>
                                            <p>&#8358; {numberFormatter(props.breakdown.paymentBreakdown.downPayment)}</p>
                                            <p>&#8358;{numberFormatter(props.breakdown.paymentBreakdown.monthlyInstallment)} </p>
                                            <p>{props.breakdown.paymentBreakdown.tenure}</p>
                                        </div>
                                        <div className='col-lg-4 payment-box'>
                                            <p>Customize Down Payment</p>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" style={{ background: '#B6038C', color: '#fff' }} id="basic-addon1">N</span>
                                                </div>
                                                <input type="number" className='form-control' placeholder="Down Payment" name='downPayment' value={props.downPayment} onChange={props.changeDownPayment} />
                                            </div>
                                            <div className='mt-4'>
                                                <button onClick={props.updateBreakdown} className='btn' style={{ border: '2px solid #fff', borderRadius: '20px', color: '#fff' }}>Update Breakdown</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            )

                            }

                        </>

                    )

                }
            </div>

            {props.breakdown.length !== 0 && (
                <div className='mt-5'>
                    <button className='btn payqart-purple' style={{ border: '2px solid #b6038c', borderRadius: '20px' }} onClick={props.submit}>Submit</button>
                </div>
            )}



        </div>
    )
}
