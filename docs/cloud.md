# Cloud

## Instancia EC2 da AWS

### Instancia atual

- IPv4 Public IP: `18.230.188.16`
- [Type](https://aws.amazon.com/pt/ec2/instance-types/): `t2.micro` 

### Caminho

- Node API: `/opt/bitnami/htdocs/combinei/api`

## Apache Configs

> ⚠️ Qualquer edição feita nos arquivos precisa reiniciar o apache `sudo /opt/bitnami/ctlscript.sh restart apache`

### API Node (Nest.js)

- Arquivo: `/home/bitnami/stack/apache/conf/vhosts/api-combinei-https-vhost.conf`

```
<VirtualHost _default_:80>
  ServerName api.combinei.app
  ServerAlias www.api.combinei.app
  DocumentRoot "/opt/bitnami/htdocs/combinei/api/source/static"
  <Directory "/opt/bitnami/htdocs/combinei/api/source/static">
    Require all granted
  </Directory>
  ProxyPass / http://localhost:3333/
  ProxyPassReverse / http://localhost:3333/
</VirtualHost>
```

- Arquivo: `/home/bitnami/stack/apache/conf/vhosts/api-combinei-https-vhost.conf`

```
<VirtualHost _default_:80>
  ServerName api.combinei.app
  ServerAlias www.api.combinei.app
  SSLEngine on
  SSLCertificateFile "/opt/bitnami/apache/conf/bitnami/certs/server.crt"
  SSLCertificateKeyFile "/opt/bitnami/apache/conf/bitnami/certs/server.key"
  DocumentRoot "/opt/bitnami/htdocs/combinei/api/source/static"
  <Directory "/opt/bitnami/htdocs/combinei/api/source/static">
    Require all granted
  </Directory>
  ProxyPass / http://localhost:3333/
  ProxyPassReverse / http://localhost:3333/
</VirtualHost>
```
