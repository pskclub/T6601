Vote API

# dev
```bash
copy .env.sample .env
```

```bash
$ make start
```

### Project Structure 
```
http from echo
db gorm
config viper
project
    - .env
    - main.go
    - cmd
        - api
        - seed
        - migrate
        - mq
        - cronjob
    - migrate
        - nodejs from knexjs
    - seed
        - golang
    - modules
        - user
            - user.http.go
            - user.controller.go
    - models
        - user.model.go
    - dtos
        - user.dto.go
    - views
        - user.view.go
    - requests
        - user.request.go
    - services
        - user.service.go
    - repo (base on gorm)
    - consts
    - emsgs
    - helpers
```

docker build -t pskclub/t6601-api:latest  .
docker push pskclub/t6601-api:latest
