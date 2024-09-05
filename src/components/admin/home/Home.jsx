import './Home.css';
import InfoBox from '../../infoBox/InfoBox';
import { BsCart4 } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useProductCalls from '../../../hooks/useProductCalls';
import useOrderCalls from '../../../hooks/useOrderCalls';

//Icons
const productIcon = <BsCart4 size={30} color='#1f93ff' />;
const ordersIcon = <FaCartArrowDown size={30} color='orangered' />;
const earningIcon = <AiFillDollarCircle size={30} color='#b624ff' />;

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const { totalOrderAmount, orderHistory } = useSelector((state) => state.order);

  const { getAllProducts } = useProductCalls();
  const { getOrders, calculateTotalOrderAmount } = useOrderCalls();

  useEffect(() => {
    getAllProducts();
    getOrders();
    calculateTotalOrderAmount();
  }, []);

  return (
    <div className='home'>
      <h2>Admin Home</h2>
      <div className='info-box-container'>
        <InfoBox
          cardClass='card-admin card1'
          title='Earnings'
          count={`$${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass='card-admin card2'
          title='Products'
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass='card-admin card3'
          title='Orders'
          count={orderHistory.length}
          icon={ordersIcon}
        />
      </div>
    </div>
  );
};

export default Home;
