<p align="middle">
    <img width="600" alt="코코드" src="https://i.imgur.com/VemoevT.png">
</p>

<br>

---

<p align="middle">
<!-- tag -->
  <a href="https://github.com/connect-foundation/2019-04/releases" target="_blank">
    <img src="https://img.shields.io/github/v/release/connect-foundation/2019-04">
  </a>
<!-- doc -->
  <a href="https://github.com/connect-foundation/2019-04/wiki" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
<!-- issue -->
  <a href="https://github.com/connect-foundation/2019-02/issues">
    <img alt="issue tracking" src="https://img.shields.io/github/issues/connect-foundation/2019-04"/>
  </a>
<!-- pr -->
  <a href="https://github.com/connect-foundation/2019-02/pulls">
    <img alt="pr tracking" src="https://img.shields.io/github/issues-pr/connect-foundation/2019-04"/>
  </a>
<!-- travis build status -->
  <a href="https://travis-ci.org/connect-foundation/2019-04">
    <img alt="pr tracking" src="https://travis-ci.org/connect-foundation/2019-04.svg?branch=master"/>
  </a>
</p>
<br>
<br>

### 🔥 [팀 Wiki](https://github.com/connect-foundation/2019-04/wiki)
### 🔥 [인프라 구성 보러가기](https://github.com/connect-foundation/2019-04/wiki/인프라-구성도)
### 🔥 [우리 팀의 Git flow & CI/CD 전략](https://github.com/connect-foundation/2019-04/wiki/Git-flow-&-CI-CD)
### 🔥 [DB설계](https://github.com/connect-foundation/2019-04/wiki/DB-modeling)

<br>

## :house_with_garden: Home page
http://www.cocode.site

<br>

## 📺 Demo Video

<a href="https://youtu.be/ch_YnTR21Sg" target="_blank">
  <img src="https://user-images.githubusercontent.com/22452742/71337078-4e26bf00-258d-11ea-9a6e-8b0a4e5a4b5b.png" width="600">
</a>

## 📌 프로젝트 소개

> Cocode는 웹 통합개발환경 서비스를 제공하는 CodeSandbox를 clone하는 프로젝트입니다!

### 몇번의 클릭만으로 간편하고 빠르게 React 프로젝트를 생성해보세요!
실시간으로 브라우저 위에서 프로젝트 빌드 결과를 확인할 수 있습니다.
라이브 기능을 이용하면 다른 사용자와 같은 프로젝트를 동시에 편집할 수 있습니다.

<br>

## 📌 서비스 구성
```bash
🥥 cocode            # 전체 service를 제공하는 client
🥥 coconut           # client side build 기능을 수행하는 client(추후 구현 예정)
🥥 api-server        # API server
🥥 live-server       # 라이브 기능 제공 server(추후 구현 예정)
```
<br>

## 📌 프로젝트 시작하기
> 각 디렉토리 별로 .env 파일을 작성하고 시작하셔야 됩니다.
> dev.env를 참고해주세요!

### 🐳 docker-compose로 한번에 시작
```bash
# 이미지를 다시 빌드하고 컨테이너 실행
docker-compose up --build

# 컨테이너 실행
docker-compose up

# 백그라운드로 컨테이너 실행
docker-compose up -d

# 컨테이너 끄기
docker-compose down
```

### 🐕 cocode client
```
cd cocode
yarn
yarn start
```

### 🐈 api server
```
cd api-server
npm install
npm run dev
```

<br>
<br>

## 👨‍👩‍👧‍👦 멤버소개(순서대로) 
<p align="middle">
    <img width="500" alt="잘해잘해" src="https://i.imgur.com/1ZzsB4N.png">
</p>

<br>

### 👩‍ 김희라 [@lallaheeee](https://github.com/lallaheeee)
> 큼큼... 긁적긁적...

**스티브 희라**

### 👨‍ 김준표 [@BasilToast](https://github.com/BasilToast)
> 불-편하네요.

**불편한 양평사람**

### 👧‍ 우혜주 [@hzoou](https://github.com/hzoou)
> 대충? 인간에게 가장 해로운 벌레가 *대충* 이에요.

**우리 프로젝트의 비선실세!**

### 👦 육지수 [@yukjisoo](https://github.com/yukjisoo)
> 협업이 장난이에요?

**고추썰기대홰**
