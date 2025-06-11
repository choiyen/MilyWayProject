# 1단계: React 앱 빌드 (Vite)
FROM node:18 AS builder
WORKDIR /app

# package.json 먼저 복사 (캐시 활용)
COPY package*.json ./
RUN npm install

# 소스코드 복사
COPY . .

# 앱 빌드
RUN npm run build

# 2단계: nginx로 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# 필요 시 커스텀 nginx.conf 복사 가능
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
