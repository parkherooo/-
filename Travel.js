import React from 'react';
import './Travel.css';
import { useNavigate } from 'react-router-dom';
import 경복궁 from './public/images/경복궁.png';
import 광안리 from './public/images/광안리.png';
import 대릉원 from './public/images/대릉원.png';
import 사계해변 from './public/images/사계해변.png';
import 주상절리 from './public/images/주상절리.png';
import 한옥마을 from './public/images/한옥마을.png';
import 호미곶 from './public/images/호미곶.png';
import 양떼목장 from './public/images/양떼목장.png';
import 에버랜드 from './public/images/에버랜드.png';
import 무령왕릉 from './public/images/무령왕릉.png';

const regions = [
  {
    name: "서울",
    places: [
      { id: 1, src: 경복궁, alt: '경복궁', title: '경복궁' }
    ]
  },
  {
    name: "부산",
    places: [
      { id: 2, src: 광안리, alt: '광안리', title: '광안리' }
    ]
  },
  {
    name: "경주",
    places: [
      { id: 3, src: 대릉원, alt: '대릉원', title: '대릉원' }
    ]
  },
  {
    name: "제주",
    places: [
      { id: 4, src: 사계해변, alt: '사계해변', title: '사계해변' },
      { id: 5, src: 주상절리, alt: '주상절리', title: '주상절리' }
    ]
  },
  {
    name: "전주",
    places: [
      { id: 6, src: 한옥마을, alt: '한옥마을', title: '한옥마을' }
    ]
  },
  {
    name: "포항",
    places: [
      { id: 7, src: 호미곶, alt: '호미곶', title: '호미곶' }
    ]
  },
  {
    name: "평창",
    places: [
      { id: 8, src: 양떼목장, alt: '양떼목장', title: '양떼목장' }
    ]
  },
  {
    name: "용인",
    places: [
      { id: 9, src: 에버랜드, alt: '에버랜드', title: '에버랜드' }
    ]
  },
  {
    name: "공주",
    places: [
      { id: 10, src: 무령왕릉, alt: '무령왕릉', title: '무령왕릉' }
    ]
  }
];

const Travel = () => {
  const navigate = useNavigate();

  return (
    <div className="regions">
      {regions.map(region => (
        <div key={region.name} className="region">
          <h2>{region.name}</h2>
          <div className="image-grid">
            {region.places.map(place => (
              <div
                key={place.id}
                className="image-item"
                onClick={() => navigate(`/place/${place.id}`)}
                style={{ cursor: 'pointer' }} // 커서를 포인터로 변경
              >
                <img src={place.src} alt={place.alt} />
                <p>{place.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Travel;
