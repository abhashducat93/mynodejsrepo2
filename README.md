docker build -t financial-dashboard .
docker run -d -p 3000:3000 --name finance-app financial-dashboard
