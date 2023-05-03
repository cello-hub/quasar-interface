#!/bin/bash
image_name="quasar-interface-image"
container_name="quasar-interface"

docker stop $container_name
docker rm $container_name

docker rmi $image_name

docker build -t $image_name .

docker run -d --name $container_name -p 8088:80 $image_name 