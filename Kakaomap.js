import React, { useEffect, useState } from 'react';

const KakaoMap = () => {
  const [keyword, setKeyword] = useState('가야동 맛집');
  const [places, setPlaces] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [ps, setPs] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=be0cb50db92a9b8335f3aa1d6a6327e8&autoload=false&libraries=services`;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        const mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3
        };
        const map = new kakao.maps.Map(container, mapOption);
        const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

        setMap(map);
        setInfowindow(infowindow);

        const ps = new kakao.maps.services.Places();
        setPs(ps);

        searchPlaces(ps, map, infowindow, keyword);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchPlaces(ps, map, infowindow, keyword);
  };

  const searchPlaces = (ps, map, infowindow, keyword) => {
    const trimmedKeyword = keyword.trim();
    if (!trimmedKeyword) {
      alert('키워드를 입력해주세요!');
      return;
    }

    if (ps) {
      ps.keywordSearch(trimmedKeyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pagination);

          markers.forEach(marker => {
            marker.setMap(null);
          });

          const newMarkers = displayPlaces(data, map, infowindow);
          setMarkers(newMarkers);

          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
        }
      });
    } else {
      console.error('Places 서비스가 초기화되지 않았습니다.');
    }
  };

  const displayPlaces = (places, map, infowindow) => {
    const bounds = new kakao.maps.LatLngBounds();
    const listEl = document.getElementById('placesList');
    listEl.innerHTML = '';

    const newMarkers = places.map((place, index) => {
      const placePosition = new kakao.maps.LatLng(place.y, place.x);
      const markerImageSrc = `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png`;
      const markerImageSize = new kakao.maps.Size(36, 37);
      const markerImageOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, (index * 46)),
        offset: new kakao.maps.Point(13, 37)
      };
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize, markerImageOptions);

      const marker = new kakao.maps.Marker({
        position: placePosition,
        image: markerImage
      });

      marker.setMap(map);
      bounds.extend(placePosition);

      const itemEl = document.createElement('li');
      itemEl.className = 'item';
      itemEl.style.cursor = 'pointer';
      itemEl.innerHTML = `
        <span class="markerbg marker_${index + 1}"></span>
        <div class="info">
          <h5>${index + 1}. ${place.place_name}</h5>
          ${place.road_address_name ? `<span>${place.road_address_name}</span><span class="jibun gray">${place.address_name}</span>` : `<span>${place.address_name}</span>`}
          <span class="tel">${place.phone}</span>
        </div>
      `;

      itemEl.onmouseover = () => {
        displayInfowindow(marker, place.place_name, infowindow);
      };

      itemEl.onmouseout = () => {
        infowindow.close();
      };

      itemEl.onclick = () => {
        map.panTo(placePosition);
      };

      listEl.appendChild(itemEl);
      return marker;
    });

    map.setBounds(bounds);
    return newMarkers;
  };

  const displayInfowindow = (marker, title, infowindow) => {
    infowindow.setContent(`<div style="padding:10px;">${title}</div>`);
    infowindow.open(map, marker);
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.getElementById('pagination');
    paginationEl.innerHTML = '';

    for (let i = 1; i <= pagination.last; i++) {
      const el = document.createElement('a');
      el.href = '#';
      el.innerHTML = i;
      el.className = (i === pagination.current) ? 'on' : '';
      el.onclick = (e) => {
        e.preventDefault();
        pagination.gotoPage(i);
      };
      paginationEl.appendChild(el);
    }
  };

  return (
    <div className="map_wrap" style={{ display: 'flex' }}>
      <div id="map" style={{ width: '70%', height: '100vh' }}></div>
      <div id="menu_wrap" className="bg_white" style={{ width: '30%', padding: '10px', boxSizing: 'border-box', overflowY: 'auto' }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '10px' }}>
          키워드 : <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} id="keyword" size="15" />
          <button type="submit">검색하기</button>
        </form>
        <ul id="placesList"></ul>
        <div id="pagination" style={{ marginTop: '10px' }}></div>
      </div>
    </div>
  );
};

export default KakaoMap;
