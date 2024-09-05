import './ChangeOrderStatus.css';
import React, { useState } from 'react';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import { useSelector } from 'react-redux';
import useOrderCalls from '../../../hooks/useOrderCalls';

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('');
  const { loading } = useSelector((state) => state.order);
  const { editOrder } = useOrderCalls();

  const handleSubmit = (e) => {
    e.preventDefault();

    editOrder(id, order, status);
  };

  return (
    <>
      {loading && <Loader />}

      <div className='status'>
        <Card cardClass='card'>
          <h4>Update Status</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value='' disabled>
                  -- Choose one --
                </option>
                <option value='Order Placed...'>Order Placed...</option>
                <option value='Processing...'>Processing...</option>
                <option value='Shipped...'>Shipped...</option>
                <option value='Delivered'>Delivered</option>
              </select>
            </span>
            <span>
              <button type='submit' className='--btn --btn-primary'>
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
