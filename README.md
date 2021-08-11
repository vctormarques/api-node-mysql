API NODEJS com conexão com MySQL

Instalar dependencias
npm install

##Criar arquivo nodemon.json
    {<br>
        "env": {<br>
            "MYSQL_USER": "usuario_banco",<br>
            "MYSQL_PASSWORD": "senha_banco",<br>
            "MYSQL_DATABASE": "nome_banco",<br>
            "MYSQL_HOST": "host",<br>
            "MYSQL_PORT": porta<br>
        }<br>
    }<br>

##Iniciar o servidor: npm start

- Front
Mudar url da api em inc/function.php