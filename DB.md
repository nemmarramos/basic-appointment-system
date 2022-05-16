
## Sequelize commands
`npx sequelize-cli init`

`npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,avatar:string`

`npx sequelize-cli model:generate --name Group --attributes name:string`

`npx sequelize-cli model:generate --name UserGroup --attributes userId:integer,groupId:integer`

`npx sequelize db:migrate`