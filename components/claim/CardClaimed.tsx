import Image from 'next/image';
import loyaltyCard from '../../public/loyalty_card.png';

const CardClaimed = () => {
  return (
    <div className="w-[800px]">
      <Image src={loyaltyCard} layout="responsive" alt="Loyalty Card" />
    </div>
  );
};

export default CardClaimed;
