Frontend
React + Vite + supabase + trpc

update .env.example to be .env.local and fill in the neccessary variables



Backend
trpc + drizzle + postgres/supabase

update .env.example to be .env.local and fill in the neccessary variables



Getting Started

open the ./Backend folder in terminal then run the following to start
run ```supabase start``` in the root dir to start supabase.
run ```bun run generate && bun run migrate``` to apply simple migration to the supabse postgres instance.
run ```bun run dev``` to start trpc api.

open the ./Frontend folder in another terminal window and run
```bun run dev``` to sart the UI.
