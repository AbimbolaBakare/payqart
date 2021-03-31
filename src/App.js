import React, { useState, useEffect } from 'react';
import StepWizard from 'react-step-wizard';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { fetchOrders } from './services/orderService';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersAction, getRepaymentBreakdownAction } from './redux/actions/actionCreators';
import { numberFormatter } from './components/numberFormatter';
import { getRepaymentBreakdown, submitRequest } from './services/repaymentService';
import moment from 'moment';


function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.ordersReducer.data);
  const repayment_breakdown = useSelector(state => state.repaymentPlanReducer.plan)
  const [employment, setEmployment] = useState('');
  const [salary, setSalary] = useState('');
  const [existing, setExisting] = useState('');
  const [date, setDate] = useState('');
  const [repayment, setRepaymment] = useState('');
  const [downPayment, setDownPayment] = useState('')

  const [data, setData] = useState({
    employmentType: employment,
    monthlySalary: salary,
    nextPayDay: date,
    existingLoan: existing === 'yes' ? true : false,
    order: orders.id,
    repaymentPlan: repayment
  });

  const [newData, setNewData] = useState({
    employmentType: employment,
    monthlySalary: salary,
    nextPayDay: date,
    existingLoan: existing === 'yes' ? true : false,
    order: orders.id,
    repaymentPlan: repayment,
    paymentBreakdown: {
      downPayment
    }
  })

  console.log(newData)

  useEffect(() => {
    setData({
      employmentType: employment,
      monthlySalary: salary,
      nextPayDay: moment(date).format('MM-DD-YYYY'),
      existingLoan: existing === 'yes' ? true : false,
      order: orders.id,
      repaymentPlan: repayment
    })
  }, [employment, salary, existing, date, repayment, data.repaymentPlan])

  useEffect(() => {
    setNewData({
      employmentType: employment,
      monthlySalary: salary,
      nextPayDay: moment(date).format('MM-DD-YYYY'),
      existingLoan: existing === 'yes' ? true : false,
      order: orders.id,
      repaymentPlan: repayment,
      paymentBreakdown: {
        downPayment
      }
    })
  }, [employment, salary, existing, date, repayment, data.repaymentPlan, downPayment])

  // Function to getOrders
  const getOrders = async () => {
    setIsLoading(true);
    await fetchOrders().then((res) => {
      setIsLoading(false)
      dispatch(fetchOrdersAction(res.data));
    }).catch((error) => {
      setIsLoading(false)
    })
  };

  useEffect(() => {
    getOrders();
  }, []);

  const total = orders.orderItems ? orders.orderItems.reduce((sum, items) => sum + items.price, 0) : 0


  function handleChangeMonth(val) {
    setRepaymment(val)
  };

  // To get the repayment breakdown
  const breakdown = async () => {
    setIsLoading(true);
    await getRepaymentBreakdown(data).then((res) => {
      setIsLoading(false)
      dispatch(getRepaymentBreakdownAction(res.data));
    }).catch((error) => {
      setIsLoading(false)
    })
  };

  // To update down payment
  const updateBreakdown = async () => {
    setIsLoading(true);
    await getRepaymentBreakdown(newData).then((res) => {
      setIsLoading(false)
      dispatch(getRepaymentBreakdownAction(res.data));
    }).catch((error) => {
      alert(error.response.data.error)
      setIsLoading(false)
    })
  };


  useEffect(() => {
    if (data.repaymentPlan !== '') {
      breakdown()
    }
  }, [repayment, data.repaymentPlan]);

  // To submit final request
  async function submitRes() {
    if (downPayment === '') {
      await submitRequest(data).then(() => {
        alert('request submitted successfully')
      }).catch(() => {
        alert('error')
      })
    } else {
      await submitRequest(newData).then(() => {
        alert('request submitted successfully')
      }).catch(() => {
        alert('error')
      })
    }

  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-6 pl-lg-0 mb-5'>
          <div className='row' style={{ background: "#eee", height: '100vh' }}>
            <div className='col-lg-7'>
              <header>
                <img src='./images/logo.jpeg' alt='logo' />
              </header>

            </div>
            <div className='col-lg-5'>
              {isLoading && 'Please wait........'

              }
              <p className='mt-5'>ORDER SUMMARY</p>
              {orders.orderItems ?
                <>
                  <div className='order-box'>
                    {orders.orderItems.map((data, i) => {
                      return (
                        <div className='row mt-3' key={i}>
                          <div className='col-lg-6'>
                            {data._id === '60621bf6d185382cb829f5f5' ?
                              <img src='/images/shirt.jpg' alt='order' className='img-fluid' />
                              :
                              <img src='/images/phone.jpg' alt='order' className='img-fluid' />

                            }

                          </div>
                          <div className='col-lg-6'>
                            <p className='m-0'>{data.name}</p>
                            <p className='m-0'>{data.price}</p>
                            <p className='m-0'>Qty: {data.quantity}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className='order-box mt-2'>
                    <span>Total cart value: </span>
                    <span className='ml-5 font-weight-bolder'>N{numberFormatter(total)}</span>
                  </div>
                </>
                :
                ''
              }

            </div>
          </div>
        </div>

        <div className='col-lg-6 mt-5 text-center'>
          <StepWizard>
            <StepOne
              employment={employment}
              changeEmployment={(val) => setEmployment(val)}
              salary={salary}
              changeSalary={(e) => setSalary(e.target.value)}
              existing={existing}
              changeExisting={(e) => setExisting(e.target.value)}
              date={date}
              changeDate={(e) => setDate(e.target.value)}
            />
            <StepTwo repayment={repayment}
              changeRepayment={(val) => handleChangeMonth(val)}
              breakdown={repayment_breakdown}
              submit={submitRes}
              downPayment={downPayment}
              changeDownPayment={(e) => setDownPayment(e.target.value)}
              updateBreakdown={updateBreakdown}
            />
          </StepWizard>
        </div>
      </div>
    </div>
  );
}

export default App;
