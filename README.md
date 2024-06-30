## Design Decision
Since Next.js is primarily SSR, most of my app is using SSR(especially the data fetching and stuff). Since we are using Next.js, I don't there is any point in using client side fetching and rendering. Have only used it whereever it's necessary.
## Challenge
I have never worked with Next.js so it took me a bit of time to wrap my head around it.

## Steps to run

- Execute `npm install`
- Go to the prisma directory and execute `npx prisma dev migrate` and `npm prisma generate`. This'll apply all your migrations to your database and initialize the prisma client.
- Go to [https://github.com/settings/developers](https://github.com/settings/developers) and create an app. Obtain `CLIENT_ID`, `CLIENT_SECRET` and put them in `.env.local`. Make sure to st home url to `http://localhost:3000` and authorization callback to `http://localhost:3000/api/auth/callback/github` in the auth app.
- execute `npm run dev` to start the server.

Open [http://localhost:3000/movies/search](http://localhost:3000/movies/search) with your browser to see the result.
