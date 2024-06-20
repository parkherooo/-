import React from "react";
import 여기어때 from './public/images/여기어때.jpg';
import 야놀자 from './public/images/야놀자.jpg';
import 호텔엔조이 from './public/images/호텔엔조이.jpg';
import './Lodging.css';

const lodgingSites = [
  {
    name: "여기어때",
    description: "여기어때는 국내 최대 규모의 숙박 예약 플랫폼 중 하나로, 다양한 숙소를 제공합니다.",
    image: 여기어때,
    link: "https://www.goodchoice.kr/"
  },
  {
    name: "야놀자",
    description: "야놀자는 국내 다양한 숙소를 저렴한 가격에 제공하는 플랫폼입니다.",
    image: 야놀자, 
    link: "https://www.yanolja.com/"
  },
  {
    name: "호텔엔조이",
    description: "호텔엔조이는 호텔, 리조트, 펜션 등 다양한 숙박 시설을 예약할 수 있는 플랫폼입니다.",
    image: 호텔엔조이, 
    link: "https://www.hotelnjoy.com/"
  }
];

const Lodging = () => {
  return (
    <div className="lodging-container">
      <h2>국내 숙박 사이트 소개</h2>
      {lodgingSites.map((site, index) => (
        <div key={index} className="lodging-site">
          <img 
            src={site.image} 
            alt={site.name} 
          />
          <h3>{site.name}</h3>
          <p>{site.description}</p>
          <a 
            href={site.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {site.name} 사이트 방문하기
          </a>
        </div>
      ))}
    </div>
  );
};

export default Lodging;
