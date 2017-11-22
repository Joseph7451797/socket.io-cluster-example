# socket.io_cluster_example

A socket.io example with pm2 cluster setting.

## Setting

- nginx.conf
```
upstream io_nodes {
      ip_hash;
      server 127.0.0.1:3131;
      server 127.0.0.1:3132;
      server 127.0.0.1:3133;
      server 127.0.0.1:3134;
    }
    server {
        listen 80;
        server_name nodecluster.test;
        location / {
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_http_version 1.1;
          proxy_pass http://io_nodes;
        }
  }
```
ps. Dont't forget to setup your hosts file.

## Demo

- Install modules & run server

```
$ npm install
$ npm run prod:start
```

Then open http://nodecluster.test.

## More info

- Check out package.json & app.js
- [PM2](https://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode)
- [Socket.io](https://socket.io/docs/using-multiple-nodes/)

## License

MIT