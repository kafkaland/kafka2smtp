docker run -p 2181:2181 -p 9092:9092 \
    --env ADVERTISED_HOST=localhost \
    --env ADVERTISED_PORT=9092 \
    --env TOPICS=test \
    --name kafka \
    spotify/kafka

docker run -p 25:25 --name smtp namshi/smtp