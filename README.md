<h1 align="center">🥥 Cocode &nbsp🥥</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/YukJiSoo/umchan-server">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
</p>

## Command

- clone을 받은 후 자신의 로컬환경에서 개별 service project에 대한 개발을 시작
- 개별 service project의 root directory에서 `npm install` 실행

<br>

- 개발 container들을 실행시키는 docker-compose 명령어

```

// 이미지를 다시 빌드하고 컨테이너 실행
docker-compose up --build

// 컨테이너 실행
docker-compose up

// 백그라운드로 컨테이너 실행
docker-compose up -d

// 컨테이너 끄기
docker-compose down
```
