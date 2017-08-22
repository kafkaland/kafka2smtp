# kafka2smtp
[![Build Status](https://travis-ci.org/kafkaland/kafka2smtp.svg?branch=master)](https://travis-ci.org/kafkaland/kafka2smtp)

Kafka to SMTP proxy-service.

## Input
Subscribes to the topic `emails`. 
Requires the following JSON structure:
```json
  {
    "from": "admin@localhost",
    "to": "user@localhost",
    "subject": "welcome aboard",
    "text": "this is a message"
  }
```

## Output
Creates an email object and sends it further to SMTP server. 

