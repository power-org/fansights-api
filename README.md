## FaNSights Application

We know that there are so many applications that helps people monitor their daily exercise, calorie intakes or even create a diet plan, but only few app allow you to tracks food's nutritional content.

Imagine an application that allows you to track your food and nutrition in one app. Set goals to reach, know the food trend in your area, and gives insights to your eating habit. We make it easy with very simple steps.

- Step 1 - Take a picture of the food you will eat.

- Step 2 - Let the application (Vision AI) identify what food you ate.

- Step 3 - Get the nutritional content of that food from a food bank database. (USDA)

- Step 4 - Show the nutritional value and ask if they will record it.

This made possible with the data from [USDA Data](https://ndb.nal.usda.gov/ndb/search/list?home=true) and Microsoft's Vision AI API.


#### Using existing account
- Our application is deployed online so you can use the following accounts and login [here](https://fansight.kenster.tech/login):
```
email: kendrick004@gmail.com
password: pass

email: mark.christian.paderes@gmail.com
password: pass

email: sirjeromepatiga@gmail.com
password: pass
```

#### Creating account
- Go to [signup page](https://fansight.kenster.tech/signup)
- Fill out necessary details.
- Go to [login page](https://fansight.kenster.tech/login) using your account.


#### Local Setup
- Clone the repository

```
git clone https://github.com/power-org/fansights-app.git
cd fansights-app
npm install
```

- Setup your MySQL by importing our db structure

> *NOTE 1*: We are using the Data from [USDA](https://ndb.nal.usda.gov/ndb/search/list?home=true). Kindly import their data manually because it's quite big. We are using the `Standard Database`

> *NOTE 2*: We create `tags` table in our database. This allows us to filter `Microsoft Vision AI API` results and match to `USDA` database. Kindly add tags before testing the application. `Example Tags: bun, burger, pasta, etc...`

- Setup the local ENV and save it as `.env`. You can copy the `.env.example` for your guide.

> *NOTE*: We are using `AWS S3 Object` for the image uploads. You need to have `AWS S3 Credentials` to proceed with the installation.

```
PORT=PORT_NO

SESSION_SECRET=SECRET_KEY_FOR_SESSION

DB_HOST=YOUR_HOST
DB_USER=YOUR_ROOT
DB_PASS=
DB_NAME=YOUR_DB_NAME
DB_PORT=3306
DB_SSL=false
DB_SSL_KEY=

AWS_S3_ID=
AWS_S3_KEY=
AWS_S3_REGION=
AWS_S3_VERSION=
AWS_S3_BUCKET=

AZURE_SERVICE_KEY=
AZURE_URL=
```

- Run the application

```
# Running in dev
npm start #or
npm run dev

# Running in prod
npm run prod
```

- Browse the application based on your local setup in our case it's `http://localhost:3000`.
