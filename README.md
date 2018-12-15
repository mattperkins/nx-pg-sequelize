# INSTALL 
## yarn 

# RUN 
## yarn dev

# ENDPOINTS 
## localhost:3006
## localhost:3006/notices

# DEPLOY 
## tbd

=> \c DBNAME
=> create table notices( id SERIAL, title CHAR(200), keywords CHAR(100), price CHAR(6), description TEXT, contact CHAR(50), "createdAt" DATE, "updatedAt" DATE );
=> \dt
// MUST USE DOUBLE QUOTES TO PRESERVE EXACT CASE WHEN NAMING TABLE COLUMNS (as above)
