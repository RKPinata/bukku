# Bukku Take Home Assignment

Demo available at: [https://bukku.vercel.app](https://bukku.vercel.app)

Watch the explanation video: [https://youtu.be/QdjeiDaKM_4](https://youtu.be/QdjeiDaKM_4)

## General Instructions

### Install Dependencies
You can install dependencies using any of the following package managers:

```bash
yarn install
```
```bash
bun install
```

### Edit environment variables
- Rename the .env.sample file to .env
- Add the following env
```
SUPABASE_PROJECT_ID=vvsggsowcopktjmaccbf
NEXT_PUBLIC_SUPABASE_URL=https://vvsggsowcopktjmaccbf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2c2dnc293Y29wa3RqbWFjY2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1NTExMzQsImV4cCI6MjA0NDEyNzEzNH0.TaF5Rbxh5Ajnh_ZTlni9ZqTsOPEgJ2NMqUtYiOk6nx4
```
> **Note**: This is usually dangerous to share in ReadMe. But for simplicity sake I included here. The project is one time use and the tokens can be easily deleted


### Run the Project
To run the project in development mode, use one of the following commands based on your preferred package manager:

```bash
yarn dev
```

```bash
bun dev
```

> **Note**: npm is currently not supported due to a dependency compatibility issue. A fix is being investigated.

The application should run in [localhost:3000](http://localhost:3000)
