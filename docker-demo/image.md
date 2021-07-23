# docker

## docker 核心

### docker 镜像 命令

#### docker images

> 查看所有本地主机上的镜像

| 命令选项              | 意义                                  |
|-----------------------|---------------------------------------|
| -a, --all        | 列出所有镜像，默认为 true             |
| --disests        | 列出镜像数字摘要值，默认为true        |
| -f, --filter=[]       | 过滤列出的镜像                        |
| --format="TEMPLATE"   | 控制输出格式                          |
| -q, --quiet      | 仅输出ID信息            |

#### docker search

>搜索镜像

| 命令选项              | 意义                                  |
|-----------------------|---------------------------------------|
| --filter        | 过滤搜索             |

#### docker pull 

>拉取镜像，分层下载，docker pull 镜像名:标签名，不写标签名则拉取最新的版本

#### docker rmi

>删除一个或一组镜像，用空格分割

| 命令选项              | 意义                                  |
|-----------------------|---------------------------------------|
| -f        | 强制删除             |

### docker 容器命令

#### docker run

>启动一个镜像，docker run [可选项] image

| 命令选项              | 意义                                  |
|-----------------------|---------------------------------------|
| --name        | 容器名字             |
| -d        | 后台方式运行             |
| -p        | 指定容器端口             |
| -P        | 随机指定端口             |
| -it        | 使用交互式运行，进入容器查看内容             |

#### docker ps

>列出所有在运行的容器

| 命令选项              | 意义        |
|-----------------------|----------------|
| -a        | 列出所有容器             |
| -q        | 仅输出ID信息             |
| -n=?        | 最近创建的容器             |

#### docker rm

>删除一个或一组容器，用空格分割

| 命令选项              | 意义                                  |
|-----------------------|---------------------------------------|
| -f        | 强制删除             |

#### docker start

>启动容器

#### docker restart

>重启容器

#### docker stop

>停止容器

#### docker kill

>强制杀死容器

### 其他命令

#### docker logs

>查看某个容器的日志

```sh
docker logs -tf --tail 10 container
```

#### docker top

>查看容器内进程信息

#### docker inspect

>查看容器信息

#### docker exec

>进入当前容器，开启一个新的终端，可以在里面操作

```sh
docker exec -it container /bin/bash
```

#### docker attach

>进去容器正在执行的代码

#### docker cp

>从容器中复制文件

```sh
docker cp container:init.sh . 
```

#### docker commit

>提交镜像

```sh
docker commit -m="描述" -a="作者" container image:tag
```

### docker 小案例

#### nginx

```sh
# 1. 下载镜像
docker pull nginx
# 2. 运行镜像生成容器
docker run -d --name xhl_nginx -p 3030:80 nginx
# 3. 测试是否正常运行
curl localhost:3030
```

#### tomcat

```sh
# 1. 下载镜像
docker pull tomcat
# 2. 运行镜像生成容器
docker run -d -p 3355:8080 --name xhl_tomcat tomcat
# 3. 复制文件夹目录到目标文件夹
cp -r /usr/local/tomcat/webapps.dist/* /usr/local/tomcat/webapps
```

### 容器数据卷

容器之间可以共享数据

```sh
docker run -it -v 主机目录:容器目录
```

#### 安装mysql

```sh
# 1. 下载镜像
docker pull mysql
# 2. 运行

```

### Dockerfile

>Dockerfile 就是用来构建 docker 镜像的构建文件

```sh
docker build -f 文件路径 -t image .
```

1. 每个保留关键字都必须大写
2. 执行从上到下顺序执行
3. #表示注释
4. 每一个指令都会创建一个镜像层

#### Dockerfile 指令

```sh
FROM                # 基础镜像，一切从这里开始构建
MAINTAINER          # 镜像维护者， 姓名+邮箱
RUN                 # 运行命令
ADD                 # 添加内容
WORKDIR             # 设置工作目录
VOLUME              # 挂载目录
EXPOSE              # 保留端口配置
CMD                 # 指定这个容器启动时候运行的命令，只有最后一个会生效，可以被替代
ENTRYPOINT          # 指定这个容器启动时候运行的命令，可以追加命令
ONBUILD             # 当构建一个被继承当时候会运行，触发指令
COPY                # 复制文件到镜像中
ENV                 # 设置环境变量
```

#### 构建centos

```sh
# 基础映像
FROM centos
# 维护者
MAINTAINER xhl<562958029@qq.com>
# 环境变量
ENV MYPATH /usr/local
# 设置工作目录
WORKDIR $MYPATH
# 安装 vim net-tools
RUN yum -y install vim
RUN yum -y install net-tools
# 暴露端口
EXPOSE 80

CMD echo $MYPATH
CMD echo "--end--"
CMD /bin/bash
```

#### CMD ENTRYPOINT

ENTRYPOINT 追加命令直接拼接到参数后面

CMD 需要完整命令去替换

#### tomcat 实战

```sh
tomcat-demo 目录结构
.
├── Dockerfile
├── apache-tomcat-9.0.35.tar.gz
├── html
│   ├── WEB-INF
│   │   └── web.xml
│   ├── a.jsp
│   └── index.html
├── jdk-8u11-linux-x64.tar.gz
├── logs
│   └──
└── readme.txt
```

```sh
# Dockerfile
# 基本镜像
FROM centos
# 基本信息
MAINTAINER xhl<562958029@qq.com>
# 复制文件
COPY readme.txt /usr/local/readme.txt
# 添加 jdk apache-tomcat 到 /usr/local 并解压
ADD jdk-8u11-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.35.tar.gz /usr/local/
# 安装 vim
RUN yum -y install vim
# 设置环境变量 工作目录
ENV MYPATH /usr/local/
WORKDIR $MYPATH
# 设置环境变量 
ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.35
ENV CATALINA_BASH /usr/local/apache-tomcat-9.0.35
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
# 暴露接口
EXPOSE 8080
# 启动 tomcat
CMD /usr/local/apache-tomcat-9.0.35/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.35/bin/logs/catalina.out
```

```sh
# 构建镜像
docker build -t my_tomcat .

# 运行镜像
docker run -d -p 8090:8080 --name xhl_tomcat -v /Users/chenxiayu/docker-demo/tomcat-demo/html:/usr/local/apache-tomcat-9.0.35/webapps/html -v /Users/chenxiayu/docker-demo/tomcat-demo/logs/:/usr/local/apache-tomcat-9.0.35/logs my_tomcat

# 请求localhost:8090
curl localhost:8090

# tag 打上标签
docker tag 392978c9c6de xiayu5/my_tomcat:1.0

# push 推送到 dockerHub
docker push xiayu5/my_tomcat:1.0

```

### docker 网络

```sh
# 查看内部网络地址
ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: tunl0@NONE: <NOARP> mtu 1480 qdisc noop state DOWN group default qlen 1000
    link/ipip 0.0.0.0 brd 0.0.0.0
3: ip6tnl0@NONE: <NOARP> mtu 1452 qdisc noop state DOWN group default qlen 1000
    link/tunnel6 :: brd ::
78: eth0@if79: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

#### 原理

每启动一个docker容器，docker就会给容器分配一个ip。容器间可以互相ping通

#### --link

连接容器，只能 A 连 B，A 能 ping 通 A，B ping 不通 A

#### 网络模式

```sh
bridge:         桥接模式 (默认)
none:           不配置网络
host:           和宿主机共享网络
container:      容器网络互通

docker run -d -p -name c1 --net=bridge centos

docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet
--driver        模式
--subnet        子网地址
--gateway       网关

# 不使用 --link 也能 ping 通
docker run -it -d --name c1 --net mynet centos
docker run -it -d --name c2 --net mynet centos

docker exec -it c1 ping c2
PING c2 (192.168.0.3) 56(84) bytes of data.
64 bytes from c2.mynet (192.168.0.3): icmp_seq=1 ttl=64 time=0.126 ms

docker exec -it c2 ping c1
PING c1 (192.168.0.2) 56(84) bytes of data.
64 bytes from c1.mynet (192.168.0.2): icmp_seq=1 ttl=64 time=0.987 ms

# docker network connect [OPTIONS] NETWORK CONTAINER
# 容器连通到网络
docker network connect mynet cpn1
# 将cpn1加入到 mynet Containers 中

docker exec -it c2 ping cpn1
PING cpn1 (192.168.0.4) 56(84) bytes of data.
64 bytes from cpn1.mynet (192.168.0.4): icmp_seq=1 ttl=64 time=0.263 ms
64 bytes from cpn1.mynet (192.168.0.4): icmp_seq=2 ttl=64 time=0.103 ms

docker exec -it c1 ping cpn1
PING cpn1 (192.168.0.4) 56(84) bytes of data.
64 bytes from cpn1.mynet (192.168.0.4): icmp_seq=1 ttl=64 time=0.444 ms
64 bytes from cpn1.mynet (192.168.0.4): icmp_seq=2 ttl=64 time=0.076 ms

```

#### redis 集群

```sh
# init.sh
docker network create --driver bridge --subnet 192.169.0.0/16 redis 
sudo mkdir -p /Users/chenxiayu/docker-demo/redis-group-demo/redis
sudo chmod -R 777 /Users/chenxiayu/docker-demo/redis-group-demo/redis/
for port in $(seq 1 6);
do
echo "$port"
sudo mkdir -p /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/data
sudo mkdir -p /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf
sudo chmod -R 777 /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/
sudo chmod -R 777 /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/data/
sudo chmod -R 777 /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf/
sudo touch /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf/redis.conf
sudo chmod -R 777 /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf/redis.conf
sudo cat <<EOF > /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf/redis.conf
port 6379
bind 0.0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 192.169.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
sudo docker run -p 637${port}:6379 -p 1367${port}:16379 --name redis-${port} \
-v /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/data:/data \
-v /Users/chenxiayu/docker-demo/redis-group-demo/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 192.169.0.1${port} redis redis-server /etc/redis/redis.conf
done
```

```sh
# 进入容器
docker exec -it redis-1 sh
# 创建集群
redis-cli --cluster create 192.169.0.11:6379 192.169.0.12:6379 192.169.0.13:6379 192.169.0.14:6379 192.169.0.15:6379 192.169.0.16:6379 --cluster-replicas 1

# 进入集群 查看集群分布
redis-cli -c
192.169.0.14:6379> cluster nodes
0b340a93041448fd37a52fb808a9690c56aab02b 192.169.0.13:6379@16379 slave 8d6026446c28203ae8708edeec3bfa68d8606ca2 0 1590910699057 7 connected
30d17be07b086c65eb45efd449ca6e65949efd2d 192.169.0.16:6379@16379 slave 81f593301f71dec7f89d5e41a3f5facbfa4136bc 0 1590910698545 6 connected
8d6026446c28203ae8708edeec3bfa68d8606ca2 192.169.0.14:6379@16379 myself,master - 0 1590910699000 7 connected 10923-16383
81f593301f71dec7f89d5e41a3f5facbfa4136bc 192.169.0.12:6379@16379 master - 0 1590910700088 2 connected 5461-10922
acac3d931539ff56cc584b000f1edab51ec47021 192.169.0.15:6379@16379 slave e22c1502d5d6446e4ea126987bba9b3e40a84168 0 1590910699000 5 connected
e22c1502d5d6446e4ea126987bba9b3e40a84168 192.169.0.11:6379@16379 master - 0 1590910699000 1 connected 0-5460

# 随便设置一个值
192.169.0.14:6379> set b 321
-> Redirected to slot [3300] located at 192.169.0.11:6379
OK
192.169.0.14:6379> get b
-> Redirected to slot [3300] located at 192.169.0.11:6379
"321"
```
