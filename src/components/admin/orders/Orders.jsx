import './Orders.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../loader/Loader';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useOrderCalls from '../../../hooks/useOrderCalls';

const Orders = () => {
  const { getOrders } = useOrderCalls();
  const { orderHistory, loading } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <div className='order'>
        <h2>Your Order History</h2>
        <p>
          Open an order to <b>Change order status</b>
        </p>
        <br />
        <>
          {loading && <Loader />}
          <div className='table'>
            {orderHistory.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory?.map((order, index) => {
                    const { id, orderDate, orderTime, orderAmount, orderStatus } = order;
                    return (
                      <tr key={id} onClick={() => handleClick(id)}>
                        <td>{index + 1}</td>
                        <td>
                          {dateFormat(orderDate, 'dd mmmm yyyy')}
                          <small> at {orderTime}</small>
                        </td>
                        <td>{id}</td>
                        <td>
                          {'$'}
                          {orderAmount}
                        </td>
                        <td>
                          <p className={orderStatus !== 'Delivered' ? 'pending' : 'delivered'}>
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </>
  );
};

export default Orders;
