# Personalized Notification Demo (Vercel)

This is a small demo project that shows a personalized notification system and uses Vercel Cron Jobs to trigger the `/api/notify` function daily.

Key files:
- `api/notify.js` — serverless function that reads `data/tasks.json`, builds personalized messages, and logs them.
- `data/tasks.json` — sample users and tasks.
- `index.html` — simple UI to manually trigger the notification endpoint.
- `vercel.json` — config including the cron schedule set for 09:00 IST daily (cron set to `30 3 * * *` which is 03:30 UTC -> 09:00 IST).

How to deploy:
1. Upload this project to Vercel (drag & drop the zip or connect a Git repo).
2. In Vercel dashboard, confirm a Cron is created for `/api/notify` (the dashboard shows cron runs).
3. Visit the site and use the UI to test.

Notes:
- This demo simulates sending by printing to logs and returning notifications in JSON.
- To integrate with real push/email/SMS providers, replace the `console.log` lines in `api/notify.js`.
