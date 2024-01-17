### Nestjs Boilerplate 1

## Features
- Completely written in [Typescript](https://typescriptlang.org/)
- [Nestjs](https://docs.nestjs.com/) Nodejs framework
- [Postgres](https://www.postgresql.org/docs/) Powerful, open source object-relational database
- [MongoDB](https://www.mongodb.com/docs/manual/) A document database designed for ease of application development and scaling.
- [TypeORM](https://typeorm.io/) ORM
- [Mongoose](https://mongoosejs.com/) MongoDB object modeling

#### RUN
- clone repo
- run `yarn install`
- run mv .env.example .env
- update the .env with local variables
- run `yarn run start:dev`

#### Creating migration file
- run `yarn run new:migration <name of table/migration>`
- new migration file will be created in `src/migrations`
- edit the file to satisfaction
- run `yarn run migrate` to migrate the table into the db

### Testing and Commits
Unit test and E2E test are at play in this repo, make sure you have a
separate postgres db setup for test, majorly of E2E. Your test db will be deleted and created every time your do `yarn run test`.

There are two pre-commit hooks,
1) `yarn run test` => to make sure all your test pass
2) `yarn run lint` => to make sure your code pass linting

Make sure that your test db is separate from the development db else your data will be cleared.
NOTE: Before testing, create test migration by running `yarn run migrate:test`