import './OrderHistory.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import dateFormat from 'dateformat';
import useOrderCalls from '../../hooks/useOrderCalls';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { getOrders } = useOrderCalls();
  const { currentUser } = useSelector((state) => state.auth);
  const { orderHistory, loading } = useSelector((state) => state.order);

  const handleClick = (id) => {
    navigate(`/order-details/${id}`);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const filteredOrders = orderHistory.filter((order) => order.userID === currentUser?.userID);

  return (
    <section>
      <div className='container table'>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {loading && <Loader />}
          <div className='table'>
            {filteredOrders.length === 0 ? (
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
                  {filteredOrders.map((order, index) => {
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
    </section>
  );
};

export default OrderHistory;
