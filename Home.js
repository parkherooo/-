import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
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

const Home = () => {
  const [currentSet, setCurrentSet] = useState(0);

  const nextSet = () => {
    setCurrentSet((prevSet) => (prevSet + 1) % 10);
  };

  const prevSet = () => {
    setCurrentSet((prevSet) => (prevSet - 1 + 10) % 10);
  };

  const goToSet = (index) => {
    setCurrentSet(index);
  };

  useEffect(() => {
    const timer = setTimeout(nextSet, 5000);
    return () => clearTimeout(timer);
  }, [currentSet]);

  const descriptions = [
    `아름다운 연못 위에 세워진 화려한 누각으로,\n 조선 시대의 왕들이 연회를 열던 장소`,
    `광안대교라는 랜드마크와 함께\n 부산을 대표하는 해수욕장 중 하나`,
    `신라시대 왕족의 무덤이 모여 있는 유적지로,\n 신라의 역사를 깊이 체험할 수 있는 장소`,
    `제주도의 대표적인 자연 명소 중 하나로,\n 용암이 급격히 식으면서 형성된 독특한 기둥 모양의 암석 지형`,
    `약 700여 채의 전통 한옥이 밀집해 있는 곳으로,\n 한국의 전통 문화를 체험할 수 있는 대표적인 관광지`,
    `한국의 동쪽 끝자락에 위치한 명소로,\n 일출을 감상하기에 최고의 장소`,
    `맑고 투명한 바닷물과 부드러운 모래사장,\n 그리고 주변의 기암괴석들이 어우러져 있는 아름다운 해변`,
    `한국 최대의 테마파크로, 최근에 화제가 된\n 쌍둥이 아기 판다들을 만나볼 수 있는 관광지`,
    `드넓은 초원에서 양떼들이\n 자유롭게 방목되는 모습을 볼 수 있는 장소`,
    `백제 시대의 왕릉으로,\n 백제의 역사와 문화를 이해하는 데 중요한 유적지`
  ];

  return (
    <div>
      <div className="main-container">
        <div className="left-panel">
          <div className="slides" style={{ transform: `translateX(-${currentSet * 100}%)` }}>
            {[...Array(10)].map((_, index) => (
              <div key={index} className="content-container">
                <div className="content">
                  <h2>요기조기 PICK 관광지 추천!</h2>
                  <h1>{[`서울 경복궁 경회루`, `부산 광안리 해수욕장`, `경주 대릉원`, `제주 주상절리`, `전주 한옥마을`, `포항 호미곶`, `제주 사계해변`, `용인 에버랜드`, `평창 대관령 양떼목장`, `공주 무령왕릉`][index]}</h1>
                  <p>
                    {descriptions[index].split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </p>
                  <div className="more-info">
                    <span className="arrow">⟶</span>
                    <Link to={`/place/${index + 1}`}>자세히 보기</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom-info">
            <button className="arrow-button left" onClick={prevSet}></button>
            <div className="page-indicators">
              {[...Array(10)].map((_, index) => (
                <span
                  key={index}
                  className={`indicator ${currentSet === index ? 'active' : ''}`}
                  onClick={() => goToSet(index)}
                ></span>
              ))}
            </div>
            <button className="arrow-button right" onClick={nextSet}></button>
          </div>
        </div>
        <div className="right-panel">
          <div className="slides" style={{ transform: `translateX(-${currentSet * 100}%)` }}>
            {[경복궁, 광안리, 대릉원, 주상절리, 한옥마을, 호미곶, 사계해변, 에버랜드, 양떼목장, 무령왕릉].map((image, index) => (
              <div key={index} className="content-container">
                <img src={image} alt={`set${index + 1}`} className="image" />
              </div>
            ))}
          </div>
          <div className="search-container">
            <input type="text" placeholder="가고 싶은 여행지" className="search-input" />
            <button className="search-button">검색</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
