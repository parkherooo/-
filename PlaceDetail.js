import React from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import './PlaceDetail.css';
import Map from './Map';

const places = [
  {
    id: '1',
    title: '서울 경복궁 경회루',
    description: `경복궁 경회루는 서울의 중심에 위치한 경복궁 내에 자리한 아름다운 연못 위의 누각으로, 조선 시대의 대표적인 건축물 중 하나입니다. 경회루는 연못 위에 세워져 있어, 연못과 누각이 조화를 이루는 멋진 풍경을 자랑합니다. 경회루는 왕과 고위 관리들이 연회를 열거나 외국 사신을 맞이하는 장소로 사용되었으며, 그 우아한 건축 양식과 주변 자연 경관이 어우러져 한국 전통 건축의 아름다움을 느낄 수 있는 곳입니다. 특히, 봄과 가을에는 주변의 꽃과 단풍이 어우러져 더욱 장관을 이룹니다. 서울을 방문한다면 경복궁 경회루에서 조선 시대의 역사와 문화를 체험하며, 아름다운 풍경을 감상해보세요.`,
    videoId: 'DBQJYLpEm_Y', // 경복궁 관련 유튜브 영상 ID
    coords: [37.579617, 126.977041],
    location: '서울특별시 종로구 사직로 161',
  },
  {
    id: '2',
    title: '부산 광안리 해수욕장',
    description: `부산의 대표적인 해수욕장 중 하나인 광안리 해수욕장은 아름다운 백사장과 푸른 바다가 어우러진 곳으로, 휴양과 레저를 즐기기에 최적의 장소입니다. 특히, 광안대교의 야경이 유명하여 밤이 되면 더욱 로맨틱한 분위기를 느낄 수 있습니다. 해수욕을 즐긴 후에는 해변가에 늘어선 다양한 카페와 음식점에서 맛있는 해산물 요리를 맛보며 휴식을 취할 수 있습니다. 사계절 내내 다양한 축제와 이벤트가 열려 항상 활기찬 광안리 해수욕장을 꼭 방문해 보세요!`,
    videoId: 'XXXXXXXXXX', // 광안리 관련 유튜브 영상 ID
    coords: [35.153199, 129.118354],
    location: '부산광역시 수영구 광안해변로 219',
  },
  {
    id: '3',
    title: '경주 대릉원',
    description: `경주 대릉원은 신라 시대의 왕과 귀족들의 고분이 모여 있는 유적지로, 한국 고대 역사의 숨결을 느낄 수 있는 곳입니다. 이곳에는 천마총을 비롯한 여러 왕릉들이 잘 보존되어 있어, 신라 시대의 장엄한 문화를 직접 체험할 수 있습니다. 특히, 고분 내부를 탐방하며 발견된 유물들을 감상할 수 있는 특별한 기회를 제공합니다. 고즈넉한 산책로와 함께 역사 속으로의 여행을 떠나보세요. 경주 여행에서 빼놓을 수 없는 필수 방문지, 대릉원을 꼭 둘러보세요!`,
    videoId: 'XXXXXXXXXX', // 대릉원 관련 유튜브 영상 ID
    coords: [35.839476, 129.211493],
    location: '경상북도 경주시 황남동 31-1',
  },
  // 나머지 장소들도 동일한 형식으로 추가
];

const PlaceDetail = () => {
  const { placeId } = useParams();
  const place = places.find((p) => p.id === placeId);

  if (!place) {
    return <div>Place not found</div>;
  }

  return (
    <div className="place-detail">
      <h1 className="place-title">{place.title}</h1>
      <YouTube videoId={place.videoId} className="place-video" />
      <div className="place-description">
        <p>{place.description}</p>
      </div>
      <Map position={place.coords} name={place.title} />
    </div>
  );
};

export default PlaceDetail;
