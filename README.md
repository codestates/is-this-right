# 이거 맞아?

## 1. Intro

---

![스크린샷 2021-08-29 오전 11.08.16.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92d043f9-181f-4f1e-bc7e-1bedd6d051c9/스크린샷_2021-08-29_오전_11.08.16.png)

- **팀 명 :** SMS
- **프로젝트 명 :** Is this right ?
- **프로젝트 형태 :** **수강생 프로젝트**
- **팀원 :** 김병민(팀장), 김상훈, 박상현
- **배포 링크 :** [isthisright.kr](https://isthisright.kr)
- **Github Repository:** [https://github.com/codestates/is-this-right](https://github.com/codestates/is-this-right)

## 2. Project

---

1. 프로젝트 소개

**운동을 좋아하는 사람들을 위한 피드백 커뮤니티!**

![스크린샷 2021-08-29 오전 11.39.39.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3e8f8f22-5b93-46aa-9772-a74f653aedb7/스크린샷_2021-08-29_오전_11.39.39.png)

너무 많은 운동 고민들...

여러분들을 위해 '**이거 맞아?**'가 도와드립니다.

- 유저

    > 본인의 운동 영상, 사진, 궁금한 모든 것을 올려보세요. 강사님들이 피드백해주실겁니다.
    마음에 드는 피드백을 채택해주세요.
    더 자세히 물어보고 싶다면 채팅 기능을 이용해주세요

    - 질문 작성자가 가장 마음에 드는 피드백을 채택하는 시스템
    - 피드백만으론 부족하다면 직접 물어볼 수있는 채팅 시스템
    - 그 시스템을 기반으로 가장 답변 채택 수가 높은 10명을 보여주는 탑10 시스템
- 강사

    > 피드백을 달아 채택 랭킹을 올려 자신의 대표 페이지를 홍보해보세요
    연결된 채팅 기능을 통해 자유롭게 영업을 해보세요.
    당신의 오지랖을 펼쳐보세요. 구..구독자가 ..늘어날지도 ?

    - 답변 채택 수를 통한 랭킹 시스템
    - 고객 유치와 홍보를 위한 채팅 시스템
    - 탑 랭커를 위한 채택 수에 따른 수익분배

2.사용 스택 및 스택 아키텍쳐

![호롱.PNG](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e1302fc5-be57-4dff-b679-cdd2bcbbf2f1/호롱.png)

1. 기능 Flow

### 1. Client Flowchart

![client-flowchart.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2a482bf0-4973-4789-90b9-3525a1e4d69f/client-flowchart.png)

### 2. Server Flowchart

![server-flowchart.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20e488e3-08fc-4228-9dcf-eba276596324/server-flowchart.png)

4.주요 기능 GIF

- 랜딩페이지
    - 랜딩페이지

        ![랜딩.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d1f35f79-e162-4853-91b1-32861ca13fb0/랜딩.gif)

- 로그인
    - 소셜로그인

        ![소셜로그인.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0546281b-f8d1-4de9-98a4-51e2922f986e/소셜로그인.gif)

    - 자체 로그인

        ![자체로그인.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8452cfe3-7a44-4bd9-abc0-e77ab29f23c6/자체로그인.gif)

    - 반응형

        ![로그인반응형.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/24f8c165-d34e-4499-8de3-8c56e320bc52/로그인반응형.gif)

- 회원가입
    - 멘토 회원가입

        ![ezgif.com-gif-maker (2).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3ad7bbbd-1070-495d-9b55-98482b1237b9/ezgif.com-gif-maker_(2).gif)

    - 유저 회원가입

        ![ezgif.com-gif-maker.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c1f75b8f-d107-4c8d-ae6a-46f520dd7db0/ezgif.com-gif-maker.gif)

    - 반응형

        ![회원가입-반응형.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/46517866-ecda-41de-8d46-f5f9c4089f38/회원가입-반응형.gif)

- 질문페이지 - 유저
    - 질문 작성

        ![ezgif.com-gif-maker (11).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7ccbddc4-5d7b-44ab-9772-1ff0d21c50d3/ezgif.com-gif-maker_(11).gif)

    - 질문 디테일

        ![ezgif.com-gif-maker (8).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/de1b4da8-444c-4093-a2ab-078c52f5af68/ezgif.com-gif-maker_(8).gif)

    - 질문 수정

        ![ezgif.com-gif-maker (10).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/acb9f0fc-f908-4bec-b8e8-87cea9c51cf5/ezgif.com-gif-maker_(10).gif)

    - 질문 삭제

        ![ezgif.com-gif-maker (9).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d4794213-4f7d-4cc0-a118-6017d3b54cf8/ezgif.com-gif-maker_(9).gif)

    - 피드백 채택

        ![ezgif.com-gif-maker (13).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bee542bb-5886-43d4-a08c-7d4891d84412/ezgif.com-gif-maker_(13).gif)

    - 질문 검색/필터

        ![ezgif.com-gif-maker (7).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5f636bab-0831-4096-a2fb-b222e64e3f17/ezgif.com-gif-maker_(7).gif)

    - 채택 순위 top 10

        ![질문top10완성 (1).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f54f93d0-d34c-4796-be77-5f2672e21404/질문top10완성_(1).gif)

    - 반응형

        ![ezgif.com-gif-maker (12).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1599738e-fd69-469e-8945-910c9ce63c67/ezgif.com-gif-maker_(12).gif)

- 질문페이지 - 멘토
    - 피드백 작성

        ![ezgif.com-gif-maker (3).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d7d6108d-0ba2-42b6-bc70-d6f8aa38ff9b/ezgif.com-gif-maker_(3).gif)

    - 피드백 수정

        ![ezgif.com-gif-maker (4).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/022fdc74-2939-44ee-b84f-ae6b1f581907/ezgif.com-gif-maker_(4).gif)

    - 피드백 삭제

        ![ezgif.com-gif-maker (5).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a53fb7fb-0be6-4055-82fb-ee2a8009437f/ezgif.com-gif-maker_(5).gif)

    - 반응형

        ![ezgif.com-gif-maker (6).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e4f947a-f8dd-4c10-b89a-57a40807e874/ezgif.com-gif-maker_(6).gif)

- 멘토페이지
    - 리스트 페이지 필터기능

        ![ezgif.com-gif-maker (15).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b94ee488-a409-439e-ad9b-d82bbf806411/ezgif.com-gif-maker_(15).gif)

    - 멘토 디테일 페이지

        ![ezgif.com-gif-maker (14).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5a67d01d-293a-42c1-a876-f26c1d4725ce/ezgif.com-gif-maker_(14).gif)

    - 반응형

        ![멘토반응형-반복.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1cb7a140-d3ae-4955-9df8-3e446cce51b6/멘토반응형-반복.gif)

- 마이페이지
    - 마이페이지

        ![마이페이지.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/edc2a615-66c7-444f-8ad3-152b83371a91/마이페이지.gif)

    - 반응형

        ![마이페이지 반응형.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f0fe5f1c-c18c-479e-ba12-2a80a1481081/마이페이지_반응형.gif)

- 채팅
    - 채팅하기

        ![채팅수정완성11.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b3620f64-62f3-4286-91e4-44b0e617ddc1/채팅수정완성11.gif)

    - 반응형

        ![ezgif.com-gif-maker (23).gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e762640c-84b9-4bcd-88ca-561e6de6da4c/ezgif.com-gif-maker_(23).gif)

## 3. Members

---

### 팀장 : 김병민

![노션사진.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a2ce7f76-711d-4556-962d-57f45ce28866/노션사진.jpg)

`**ROLE**`  Team Leader

`**POSITION`  Front-end**

`**GITHUB` /@byungmin**

📚`**STACK**`

---

 **`JS`** `**React**`  `**Redux` `Styled-components` `Ckeditor`** 

---

- **Works**
    - SR
        - [x]  Product Architecture
        - [x]  Client flow chart
        - [x]  그 외 (공통)
    - Front-end
        - [x]  랜딩페이지 구현
        - [x]  네이게이션바 구현
        - [x]  Question 리스트 페이지 구현
        - [x]  Question 디테일 페이지 구현
        - [x]  Question 포스트 페이지 구현
        - [x]  로그인 페이지 구현
        - [x]  강사/유저 회원가입 페이지 구현
        - [x]  푸터 구현
        - [x]  마이페이지 구현

- Tech-Presentation Topic :  랜딩페이지 스크롤 애니메이션

    [노션비디오.mov](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8efa63d2-2387-48e7-a090-874256e08a30/노션비디오.mov)

    Q. 팀장으로써 한마디~

         프로젝트의 팀장으로 역할을  다 한다는 것은 매우 힘든 일일것입니다. 팀을 이끌어야하고 작업을 해야하고 많은 것들을 신경쓰고 관리해야하기 때문이죠. 그런 측면에서 본다면 저는 팀장과는 맞지 않는 사람입니다. 하지만 유능한 팀원들은 저를 그런 사람으로 만들어줬습니다. 나의 무능력함으로 인해 일정이 차질이 생겼을 때, 상훈님과 상현님 덕분에 해결할 수 있었으며, 지치고 힘들 때 팀원들 덕분에 웃을 수 있었습니다. 상현님과 상훈님 덕분에 좋은 경험을 해볼 수 있었으며 , 덕분에 좋은 팀에서 팀장이라는 새로운 경험도 해볼 수 있었습니다.  상현님 상훈님 감사했습니다.   

    Q. 프로젝트를 하면서 힘들었던 점?

    개인적으로 체력관리가 가장 힘들었습니다. 많이 부족한 실력을 ... 시간으로 메우려 하니 새벽에 자는 것을 일상이고 하루가 다르게 날을 셌습니다. 이러한 생활을 반복하다 보니 건강에 문제가 생겨 오히려 작업 속도는 느려졌고, 일정에는 차질이 생겼습니다. 

    지금 와서 생각해보면 내가 조금 더 규칙적인 패턴으로 작업을 했더라면 우리 팀에 더 많은 보탬이 됐을 텐데라는 아쉬움이 남습니다.

     

### 팀원 : 박상현

---

![노션1.jpg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5deb2e64-091c-4c1c-aed1-6fda6ffe5930/노션1.jpg)

`**ROLE**`  Team Member

`**POSITION`**  Backend

`**GITHUB`**  [/](https://github.com/HunKimADev)[@shpk93](https://github.com/shpk93)

📚`**STACK**`

---

`**Node.js**` **`Express`** `**Sequelize` `Bcypt`** 

 **`Socket.io`** `JWT` **`MySQL`** `**JS**` `**React**`  `**Redux**`

---

**Works** 

- SR
    - [x]  Flow Chart
    - [x]  API Documentation
    - [x]  그 외 (공통)
- Backend
    - [x]  user 관련 API
    - [x]  adviser 관련 API
    - [x]  jwt를 이용한 사용자 인증
    - [x]  Oauth 2.0을 이용한 소셜로그인
    - [x]  Bcrypt를 이용한 데이터 암호화
    - [x]  Squelize 및 DB 구축
    - [x]  Socket.io를 이용한 채팅기능 프로토타입 구현
- Frontend
    - [x]  Mentors 리스트 페이지 검색/필터 기능
    - [x]  Question 리스트 페이지 검색/필터 기능
    - [x]  회원가입 /로그인 기능
    - [x]  소셜 로그인 기능
    - [x]  회원정보 수정 기능
    - [x]  Question 수정 기능
    - [x]  Socket.io를 이용한 채팅기능 프로토타입 구현

- Tech-Presentation Topic :  기술 발표 주제를 적어주세요

    [상현 기술발표최종.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6b17e8e7-9bf6-4d68-85b6-f829b02f83ab/상현_기술발표최종.mp4)

    - Q.  웹 소켓 기술을 사용하면서 힘들었던 점

        기존에 배웠던 HTTP 통신이 이루어지는 "*클라이언트 → 서버*"로의 일회성 요청과는 전혀 다른 관점에서 네트워킹을 바라봐야한다는 것을 깨닫는 데에 초기 시간을 많이 투자한 것 같습니다. 하지만 어느정도 플로우를 이해한 뒤 채팅구현에 성공했을때의 쾌감은 아직도 잊지 못합니다. 새로운 것을 시도하는거라 많이 불안했었는데 생각한대로 구현되어서 정말 기분이 좋았습니다. 

    - Q. 프로젝트를 하면서 힘들었던 점?

        우선 기술적인 문제로는 상태관리가 굉장히 어려웠습니다. 저희는 리덕스와 usestate를 혼용해서 프로젝트에 사용하였는데 상태 관리를 잘못한 탓에 페이지를 한번 바꿀때마다 렌더링이 여러번되었고, 이에따른 sideEffect로 인해 프로그램이 실행될때의 상태값을 확신받지 못했습니다. 따라서 수많은 에러핸들링을 겪었고, react hook에 무서운점을 맛볼 수 있었습니다.  이번 프로젝트를 통해 다음 작업에는 state 최적화를 신경쓰며 작업해야겠다는 생각을 하였습니다.  

          또한 체력적인 문제도 있었습니다. 프로젝트 중간 백신을 맞았었는데 건강이 너무 안좋아서 마지막 1주는 정말 쉽지 않는 한주를 보냈습니다. 저의 건강으로인해 팀원의 스케줄에도 영향이 있었기 때문에 2배로 아픈 날들이었습니다.

### 팀원 : 김상훈

---

![노션사진.jpeg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bfeda81d-0af4-4ad9-9311-d06f94bf6fab/노션사진.jpeg)

`**ROLE**`  Team Member

`**POSITION`**  Full Stack

`**GITHUB`**  [/@HunKimADev](https://github.com/HunKimADev)

📚`**STACK**`

---

- **Stack**

    `**Node.js**` **`Express`** `**Sequelize` `Multer`** **`Socket.io`** **`MySQL`** `**JS**` `**CSS**` `**React**`  `**Redux**`

- **Deploy Stack**

    `**AWS` : `EC2` `S3` `RDS` `Route53` `Cloudfront` `ACM` `ELB`**

- **Works**
    - SR
        - [x]  DB Schema
        - [x]  Wireframe
        - [x]  그 외 (공통)
    - Backend
        - [x]  Chat 관련 API  (채팅목록 CRUD, 메세지 CR, 읽음 업데이트)
        - [x]  Adviser API (디테일 정보 받아오기)
        - [x]  Feedbacks 관련 API (CRUD, 채택하기, 채택취소)
        - [x]  Questions 관련 API (CRUD)
        - [x]  User관련 API (내가 작성한 포스트, 내가 작성한 피드백 받아오기)
        - [x]  Multer-S3를 이용한 영상/이미지 업로드
        - [x]  Multer-S3 (관련게시물 업데이트 혹은 삭제시 S3의 관련이미지 삭제 구현)
        - [x]  Squelize 및 DB 구축
        - [x]  SQL 작성
        - [x]  Socket.io를 이용한 실시간 채팅 기능 완성
        - [x]  에러핸들링
    - Frontend
        - [x]  Mentors 디테일 페이지 CSS
        - [x]  Mentors 리스트 페이지 CSS
        - [x]  Question 디테일 페이지 CSS
        - [x]  Question 리스트 페이지 CSS
        - [x]  채팅창 CSS
        - [x]  마이페이지 CSS
        - [x]  [Socket.io](http://socket.io)를 이용한 실시간 채팅 기능 완성
        - [x]  에러핸들링
    - 배포
        - [x]  AWS Pipeline을 이용한 배포 자동화
        - [x]  ELB / CloudFront를 이용한 서버, 클라이언트 https 배포
        - [x]  도메인 관리
        - [x]  등등

- Tech-Presentation Topic :  Socket.io를 이용한 실시간채팅 구현과 그 과정에서 마주친 에러

    [zoom_1.mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e488f9cc-180e-470e-9696-69143ed9e767/zoom_1.mp4)

    - Q. 파이널 프로젝트를 마친 소감?

        A. 솔직히 정말 많은 것들을 배울 수 있는 프로젝트였습니다. 새로운 스택들 Multer와 S3의 연동이나 Socket.io, 또 평소 정말 담쌓고 살았던 CSS, 프로젝트를 기획하고 관리하는 방법 등 기술적으로 정말 많은 것들을 배웠고,중간 중간에 가뜩이나 세명밖에 없는 팀원들이 돌아가면서 아파서 개발 일정에 차질이 생겼을 때는 위기관리능력을, 또 프로젝트 전반적으로 팀과 소통하며 팀으로 일 하는 방법을 배울 수 있었던 보람찬 시간이었습니다.

    - Q. 프로젝트를 하면서 힘들었던 점?

        A.

