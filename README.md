# api-test

API teste para o cadastro de denúncias a partir de dados de localização (latitude e longitude).

Criar denúncias (exemplo):

POST https://127.0.0.1:3333/v1/denuncias

```json
{
  "latitude": -21.208301527063867,
  "longitude": -50.42502530907879,
  "denunciante": {
    "nome": "Fulano de Tal",
    "cpf": "12345678900"
  },
  "denuncia": {
    "titulo": "Esgoto a céu aberto",
    "descricao": "Existe um esgoto a céu aberto nesta localidade."
	}
}
```
Listar denúncias:

GET https://127.0.0.1:3333/v1/denuncias

# Deploy

## Install Docker Engine (Linux Server only)

https://docs.docker.com/engine/install/

## Install Docker Compose (Linux Server only)

https://docs.docker.com/compose/install/

## Install Docker Desktop (Windows and OS X)

https://www.docker.com/products/docker-desktop

## Setting up api-test

```bash
git clone https://github.com/kotjiac/api-test.git

cd api-test/

cp .env.example .env

docker-compose up --build -d
```

## Remove api-test

```bash
docker-compose down --volume
```