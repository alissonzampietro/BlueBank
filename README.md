# Bluebank

O projeto foi feito usando ANGULAR e NODEJS. 

Subi o projeto em uma DropLet na DigitalOcean, e pode ser acessado por este link: 

[http://alzaro.com.br:8765/](http://alzaro.com.br:8765/)


# Como rodar o projeto?

Acesse a pasta através do terminal em seu computador, e instale todas as dependências através do comando:

```
npm install

```

Ao término, você deve se certificar que possui o virtualizador [Docker](https://www.docker.com/), e executar o comando:

```
docker build .

```

Você deve esperar a execução de todo o processo, que leva em torno de 2 minutos.
Terminado o processo, você deve verificar se a imagem foi criada, através do comando:

```
docker images

```

A primeira imagem da lista é a q acabamos de criar, selecione seu ID, pois iremos trabalhar em cima dela.

Com o ID dela selecionado, insira no comando abaixo, para que possamos criar nosso container:

```
docker run -d -v $(pwd):/home/app/bluebank/ -p 3000:3000 --name "bluebank" ID_IMAGEM

```

Isso iniciará sua máquina, agora que você já subiu seu container, vamos pegar seu ID:

```
docker ps

```

Ele mostrará uma lista de containers. Você deve selecionar o ID do primeiro container e usar ele no próximo comando:

```
docker exec -i id_container mysql -uroot -proot < dump/bluebank.all.sql

```

Isso importará o banco de dados e seu projeto estará pronto para ser executado ;-)

## Detalhes de implementação

Eu criei uma estrutura baseada no MVC, porém sem a VIEW, esta seria substituída por uma camada de persistência, que é onde é realizado todo o manuseamento do banco de dados e regra de negócio. Com esta estrutura é mais fácil você desacoplar a aplicação, pois se desejar usar recursos de negócio, você só precisa criar uma instância da camada de persistência desejada.

Apesar de haver validação no front end, há a validação no back end.

Apesar de nao estar no front-end, foi implementado no back-end o cadastro de contas e usuarios
