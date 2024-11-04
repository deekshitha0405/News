##
Steps to Load and Run the News Application in Docker:
Ensure Docker Desktop is Running
Make sure Docker Desktop is active on your local machine.
##
Load the Docker Image
Run the following command in your terminal to load news.tar as a Docker image:

bash
docker load -i news.tar
##
Run the News Application
Start the application by executing:

bash
docker run -p 80:80 news
Access the Application
Open a browser and go to http://localhost to view the application.