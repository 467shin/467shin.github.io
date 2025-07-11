# 🦊 전자여우굴에 어서오세요! 🎉

### https://467shin.github.io/

### 목차

> [1. 기획배경](#1-기획배경)<br/>[2. 기술 스택](#2-기술-스택)<br/>[3. 내용](#3-내용)<br/>[4. 배운점](#4-배운점)<br/>[5. 아이디어 및 참고자료](#5-아이디어-및-참고자료)<br/>[6. 고난과 역경](#6-고난과-역경)

## 1. 기획배경

- 예로부터 저만의 게시판에 대한 동경이 있었어요.
- 블로그 플랫폼을 전전하였지만 역시 직접 만들어보는게 제맛 아니겠어요? 웹 엔지니어잖아요!
- 기왕이면 풍부하면서도 과하지 않는 시각효과로 눈이 즐거운 홈페이지를 만들어보고 싶었어요. 완벽주의가 도진거죠.
- ~~이직할 때마다 이력서 양식을 여기저기 구해서 편집하는게 귀찮았어요~~

## 2. 기술 스택

#### 저의 블로그는 `Vanilla JS`로 구현되었어요.

### 선정 이유

> SSAFY에서 진행된 3번의 팀 프로젝트 모두 Front-end 팀원으로 참여하였지만, 줄곧 React만 사용해왔기 때문에 Vanilla JavaScript의 사용경험이 부족하다고 판단되어 JavaScript의 이해도를 높여보고자 선정했어요.

## 3. 내용

### 1. 이력서 및 경력기술서(cover-letter)

> 멋지게 만들었어요. 저를 뽑아주세요.

### 2. 여정(journey)

> 좋았던 곳과 재밌었던 곳을 기록해요.

~~가 본 나라는 일본밖에 없지만...~~

- [ ] 지도를 연동하거나 지구본에 띄워줄 거에요.

### 3. 일지(journal)

> 일기 비스무리한 의미없는 뻘글이 올라와요.

### 4. 자산운용(asset portfolio)

> 주식에 투자하고 차곡차곡 기록해요.

- [ ] 금감원의 실시간 주가 API를 연동해서 수익률을 JavaScript로 연산할 거에요

### ...

## 4. 배운점

### CSS

CSS를 잘 다루는 프론트엔드 개발자가 진짜 명품 개발자이다.

1. `rem`은 웹브라우저의 기본 `font-size`를 기준으로 계산되는 단위이다.
   > 글자 크기가 대충 화면 크기에 맞춰진 다는 것은 알고 있었지만 브라우저의 기본 폰트 사이즈를 기준으로 한다는 사실은 처음 알았다.
2. `border-radius`의 값은 반지름의 길이
   > %는 `width`값을 기준으로 하는 퍼센티지이다.
3. CSS로 이미지 필터도 넣을 수 있구나.......
4. `transform`은 3차원 회전, 이동 등으로 공간을 제어한다.
5. `transition`은 해당 요소가 `:hover` 등의 사용자의 인터렉션을 통한 변형이 있을 시, 애니메이션 효과로 동작을 제어한다.
6. `box-sizing: border-box`속성은 padding값을 요소 내부로 흡수시킨다.(너비/높이가 안바뀜)
7. `flex-flow`속성으로 `flex-direction`, `flex-wrap`을 한꺼번에 지정할 수 있다.
8. `inline-block`은 `inline`이지만 `block`요소처럼 높이값과 같은 속성을 가질 수 있다.
9. `top`, `bottom`, `left`, `right`속성을 사용하기 위해서는 `position:relative`를 걸어두어야 한다.
   - 항상 `flex`나 `grid`로만 위치를 맞춰서 몰랐다...
10. `translateZ`속성을 적용시키기 위해선 부모요소에 `perspective`속성을 통해 뷰포인트를 지정해줘야 한다.
    - `perspective`속성은 쉽게 말해서 속성 값 만큼 뒤로 떨어져서 보겠다는 뜻이다.
11. `z-index`를 자식요소에 주고 `relative`를 줘도 DOM 순서 뒤에 있는 다른 부모의 자식을 못 넘는다...
12. CSS 내부에서 `@import`를 잘못 사용하면 적용 우선순위가 꼬인다

## 5. 아이디어 및 참고자료

### 아이디어

1. 전체 프로젝트
   - JSON 형식으로 글을 작성하고 `resources`폴더 안에 배치하여 이를 불러온다.
   - 되도록 라이브러리를 사용하지 않고 직접 구현해본다.
2. 캐러셀 무한루프 구현에 대하여
   - `carouselSlide`의 루프제어에 재귀함수 써봤는데 쓸데없이 버벅이고 성능이 느려졌다.
   - 그냥 로직 주루룩 쓰자...
3. 캐러셀 양 옆에 이전, 다음 페이지 표시 건에 대하여
   - 캐러셀 슬라이드의 크기를 60vw 정도로 잡고
   - 나머지 20vw(`(winSize - slideSize) / 2`)를 왼쪽에 붙인다
   - 슬라이드별 위치공식 : `slideSize * now - (winSize - slideSize) / 2`
4. 페이지를 구하는 식을 쌈뽕하게 한 줄로 짜보자~
   - 순서는 3 4 1 2 3 4 1 2
   - 인덱스는 0 1 2 3 4 5 6 7
   - 목표는 1 2 3 4 5 6을 넣으면 4 1 2 3 4 1로 반환해주는 함수
   - 어찌됐건 각 요소를 전체 슬라이드의 개수인 4로 나누고 나머지를 추려야 하니까 1 2 3 4 5 6 -> 3 0 1 2 3 0
   - 짠! `(x + 2) / 4 + 1`
5. 캐러셀에 전환 시 3D 이펙트에 대하여
   - 빙글빙글 돌아가는 이펙트를 기대했지만 그렇게 하려면 레이아웃을 뜯어고쳐야 할 뿐더러 컨텐츠가 4개밖에 되지 않아 깔끔해보이지 않을 것
   - 현재 있는 코드를 적당히 개량해서 선택시 컨텐츠가 Z축으로 가까이 오는 이펙트를 주자
6. 안예쁘대서 대대적인 스타일 가지치기에 들어갔다. 우주선 같은 느낌에 심플한 느낌으로 가기로 했다.
7. 페이지 다시 구하자.
   - 순서는 4 1 2 3 4 1
   - 인덱스는 0 1 2 3 4 5
   - 목표는 인덱스를 넣으면 각각 4 1 2 3 4 1로 반환해주는 함수
   - 같은 방식으로 `(x + 3) / 4 + 1`
   - 생각해보니 시스템 인덱스 구하는 식에 + 1만 하면 되니까 이참에 합치자
8. `selected`에도 `disabled`에도 `pointer-events`에 `!important`가 붙어 있는데?
   - 마우스 스와이프 기능이랑 터치 이벤트를 적용시키기 위해서 필요했다.
   - CSS 특성상 아래 요소로 덮어쓰기(우선 적용) 되어 함께 있을 경우엔 `disabled`가 우선적용 되기 때문에 괜찮을 것!

### 참고자료

- [디자인 - Do it! 인터랙티브 웹 페이지 만들기 시리즈](https://youtu.be/y69NW0r9k0Q?si=DWaf7ebRSwccopoG)
- [JavaScript 모듈화 - [JavaScript] JS파일 분리해서 쓰기 (모듈)](https://doishalf.tistory.com/47)
- [무한 루프 캐러셀 - [JS/Slider] 바닐라 자바스크립트로 무한 루프 슬라이드(Carousel) 구현하기](https://im-developer.tistory.com/97)
- [드래그로 스와이핑 - carousel slider 만들기 (with js)](https://mong-blog.tistory.com/entry/carousel-slider-%EB%A7%8C%EB%93%A4%EA%B8%B0-with-js)
- [터치 슬라이드 - JS 터치 슬라이드 캐러셀을 만들어보자](https://velog.io/@mododa17/JS-%ED%84%B0%EC%B9%98-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-%EC%BA%90%EB%9F%AC%EC%85%80%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90-070jx6y2)
- [3D 렌더링 - [JavaScript] Three.js로 쉽게 만드는 우주 !](https://jungin.tistory.com/1)
- [지구 모델 렌더링 - [Github] 3D Earth Model](https://github.com/k99sharma/earth-model/blob/main/src/World/components/Earth.js)
- [로딩 컴포넌트 - [JavaScript] 로딩페이지 만들기](https://zthcoding.tistory.com/entry/Javascript-%EB%A1%9C%EB%94%A9%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EA%B8%B0)
- [로딩 컴포넌트 애니메이션 아이콘 - Freepik - Flaticon](https://www.flaticon.com/kr/free-animated-icons/)
- [반응형 - CSS 반응형 미디어쿼리 디바이스별 해상도 분기점](https://velog.io/@yunazzi/device-media-query)
- [반응형 - 웹페이지 가로 모드/세로 모드 인식하기](https://studiomeal.com/archives/1068)

## 6. 고난과 역경

- 나자신의 미적감각이 너무 없다...
- 아... 굳이 양옆에 다른 슬라이드를 보여줄 필요가 없어졌다. 공식 재정비 해야겠다...
- 터치 이벤트 중 transition 속성이 살아있으면 애니메이션과 터치 움직임이 충돌해서 슬라이드가 덜덜 떨린다.
- 드래그와 클릭이 함께 되는 문제
  - 드래그시 마우스 이벤트 제어하는 방식으로 해결
