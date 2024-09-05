import './InfoBox.css';
import Card from '../card/Card';

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className='info-box'>
      <Card cardClass={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </Card>
    </div>
  );
};

export default InfoBox;
