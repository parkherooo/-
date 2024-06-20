import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Travel.css'; // CSS 파일을 import합니다.

const regions = [
  { code: '1', name: '서울' },
  { code: '2', name: '인천' },
  { code: '3', name: '대전' },
  { code: '4', name: '대구' },
  { code: '5', name: '광주' },
  { code: '6', name: '부산' },
  { code: '7', name: '울산' },
  { code: '8', name: '세종' },
  { code: '31', name: '경기도' },
  { code: '32', name: '강원도' },
  { code: '33', name: '충청북도' },
  { code: '34', name: '충청남도' },
  { code: '35', name: '경상북도' },
  { code: '36', name: '경상남도' },
  { code: '37', name: '전라북도' },
  { code: '38', name: '전라남도' },
  { code: '39', name: '제주도' }
];

const Travel = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const fetchTravelData = async (retryCount = 3) => {
    setLoading(true); // 로딩 상태 설정
    setError(null); // 이전 오류 초기화

    try {
      const response = await axios.get('http://apis.data.go.kr/B551011/KorService1/areaBasedList1', {
        params: {
          serviceKey: 'BuN1R3eDaVq8xiT43d7sBPD4fPcoXhmyk9sRpfMRptmlAVkdb71MIOnnMMLOkAV20xGaWl7Kmw1UiYV%2B79i%2Bqg%3D%3D', // 여기에 본인의 서비스 키를 입력하세요
          numOfRows: 50, // 원하는 결과 개수
          pageNo: 1,
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          arrange: 'A',
          contentTypeId: 12, // 관광 정보
          areaCode: selectedRegion || '' // 선택된 지역 코드
        },
        //timeout: 5000, // 타임아웃 설정 (5초)
      });

      // XML 데이터를 DOM 객체로 파싱
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'application/xml');

      // XML DOM에서 필요한 데이터 추출
      const items = xmlDoc.getElementsByTagName('item');
      const travelList = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const title = item.getElementsByTagName('title')[0].textContent;
        const addr1 = item.getElementsByTagName('addr1')[0].textContent;
        const firstimage = item.getElementsByTagName('firstimage')[0]?.textContent || '';

        travelList.push({ title, addr1, firstimage });
      }

      console.log('Fetched data:', travelList);
      setTravelData(travelList);
    } catch (error) {
      console.error('API call error:', error);
      if (retryCount > 0) {
        console.log(`Retrying... (${3 - retryCount + 1})`);
        fetchTravelData(retryCount - 1);
      } else {
        setError('데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  useEffect(() => {
    fetchTravelData();
  }, [selectedRegion]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const totalPages = Math.ceil(travelData.length / itemsPerPage);
  const currentData = travelData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <h2 className="title">여행지 추천</h2>
      <div className="button-container">
        {regions.map(region => (
          <button 
            key={region.code} 
            onClick={() => {
              setSelectedRegion(region.code);
              setCurrentPage(1); // 지역을 변경할 때 페이지를 초기화
            }}
            className={`button ${region.code === selectedRegion ? 'active' : ''}`}
          >
            {region.name}
          </button>
        ))}
        <button 
          onClick={() => {
            setSelectedRegion(null);
            setCurrentPage(1); // 전체를 선택할 때 페이지를 초기화
          }}
          className={`button ${selectedRegion === null ? 'active' : ''}`}
        >
          전체
        </button>
      </div>
      <div className="travel-list">
        {currentData.map((item, index) => (
          <div className="travel-item" key={index}>
            <img className="travel-image" src={item.firstimage} alt={item.title} />
            <div>
              <h2>{item.title}</h2>
              <p>{item.addr1}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button 
            key={page} 
            onClick={() => handlePageChange(page)}
            className={`page-button ${page === currentPage ? 'active' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Travel;
