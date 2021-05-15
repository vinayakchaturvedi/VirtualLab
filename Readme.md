# **SPE Main Project - Virtual Lab**


Virtual lab is a simulated learning environment that allows students to complete computer
science laboratory exercises online and explore concepts and theories without stepping into
a physical lab. Virtual labs can be used to help faculty to explain complex theoretical
concepts. This project is aimed towards achieving the above concept. The key note behind
each lab is that each lab and student is isolated from other labs and other students. To
achieve this we have used the container based approach for creating labs.


![Application_Workflow](./ArchitectureDesign/Application_Workflow.PNG)


![Architecture](./ArchitectureDesign/Architecture.PNG)


![DatabaseSchema](./ArchitectureDesign/DatabaseSchema.PNG)


## **How to run**
1. Stop following services (if installed and running)
   
    a. sudo systemctl stop mysql
   
    b. sudo systemctl stop mongod
   
2. git pull https://github.com/vinayakchaturvedi/VirtualLab.git
3. Install docker and docker-compose
   
    a. sudo apt-get install docker

    b. sudo apt-get install docker-compose

4. sudo chmod 777 /var/run/docker.sock
5. docker-compose up
6. Start using the application by going to http://localhost:4200/


