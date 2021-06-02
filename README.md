# node-docker

When deploying on production, at the server should be configured the next environment variables:
 
    - MONGO_USER
    - MONGO_PASSWORD
    - SESSION_SECRET

    - MONGO_INITDB_ROOT_USERNAME
    - MONGO_INITDB_ROOT_PASSWORD


For Ubuntu (and other Linux) use:

export MONGO_USER="root"
export MONGO_PASSWORD="password"
export SESSION_SECRET="secret"

export MONGO_INITDB_ROOT_USERNAME="root"
export MONGO_INITDB_ROOT_PASSWORD="password"

and check using the command:

`printenv`

but this is not a persistent way to store this variables.

To store those variables in a persistent way, under the roor folder:

/root

Create environment file:

`vi .env`

and store:

> NODE_ENV=production
> 
> MONGO_USER=root
> 
> MONGO_PASSWORD=password
> 
> SESSION_SECRET=secret
> 
> MONGO_INITDB_ROOT_USERNAME=root
> 
> MONGO_INITDB_ROOT_PASSWORD=password

add reference in the .profile file

`vi .profile`

add at the bottom of the file:

`set -o allexport; source /root/.env; set +o allexports;`
