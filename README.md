# Project-Team-3

Student Names :
                Animesh Grover,
                Chikei Loi,
                Deekshitha Reddy Kankanala,
                Vishwajeet Kharote              
                
               

Project:


 	Project​ ​title​: Blockchain-Apartment Rental Project.

Project description:​ In this project, we would like to implement Blockchain technology in apartment rental transaction workflow. For people who have experience in renting apartment, leasing offices make the thing look easy. However, it can be quite complicated in reality. A significant challenge nowadays faced by apartment rental networks is that the supporting information systems are often disintegrated. Blockchain technology provides a possibility where every member in this network could monitor access and share and analyze consistent and up-to-date information.

## Project Live: http://ec2-54-183-237-25.us-west-1.compute.amazonaws.com/

USECASES /PERSONAS:

1.Jake, a customer looking to buy an apartment will surely experience an easy and
flexible leasing procedure which governed by the implementing blockchain and
sparkML. It will be very easy to get a summary of lease document and raise any
maintenance related issues.

2.Rick, a leasing officer can keep track of all tenants, their lease contracts and any other
issues relating to lease violation. It will be easy for him to record various requirements
specified in the lease document by different tenants. Also track any fraud detection.

3.Kelly, a member of management office can serve the customers in an efficient and
better way for the maintenance requests they raised. Also perform big data analysis on
all the properties managed by her.

Working of our Project:
● Blockchain is used to store all the important documents to ensure they remain
secure.
● Customer specifies the requirements and the application scans the entire lease
document using SparkML. This provides the exact, accurate summary of the
lease document and allows customer to have a clear understanding of the long
lease document.
● It will provide the customer the penalty associated with early lease termination,
violation of any terms specified in the lease document.
● The dispute resolution at the time of lease termination is handled effectively.
● If some state law has proposed a new law stating that there is increase in rent or any specific change ,then we will compare with the current information and then tenant will get that information.
● Even if the tenant claims that he paid rent two days before ,we have timestamp which would store the total history so that he cant claim and every thing would get validated.



## Featues:
### Using blockchain to store all the transactions between tenants and the leasing office/property manager. Including payment, dispute resolution and lease renewal.
### usinng spark and ML to compare the current lease with any new laws and regulation enforced by the state/county.

# Proposed​ ​methodology/ ​ ​resources: 
We implemented the front end by using the react and backend is implemented by nodejs.
Blockchain and Hyperledger composer have been used inorder to store the lease document.
Inoder to scan the lease document and get the required information of the tenant we have used the SparkML.
We will be using the spark to scan the lease document and summarize the required details of the tenant.
Inorder to store the user login details we have used the mongodb.
Performed the SQL Injection and XSS attacks prevention techinques. 
Our platform will be multi-tenant providing a dashboard for customer and anotherview for business owner. Business owner can customize details, connect andprovide more personalized campaign and recommendation to their users.







To set up project-
--------------
1) install node.js
2) npm install -g gulp
3) clone this project git clone
4) cd into the project
5) npm install
6) npm run build 
7) npm run start
8) mysql -u admin -p --host sl-us-south-1-portal.22.dblayer.com --port 39849 --ssl-ca=./server/cert/cert.crt


steps to install and run

npm install
npm run build && npm run start
To debug server code in chrome

npm run build
npm run debug
in browser goto chrome://inspect
click on project link, under source tab you will see all server file, now you can add breakpoints and debug
Note: dist folder will be created automatically when you build. Do not make code changes inside dist folder.

steps to connect to mysql:

opne your command prompt or terminal
mysql -u admin -p --host sl-us-south-1-portal.22.dblayer.com --port 39849 --ssl-ca={project_path}\server\cert\ssl.crt
it should ask you password enter below password YUNVSJBQKEHIOIQJ
