# Certificate System Setup

One-time setup so the `/verify` page can look up certificates in a Google Sheet.

## 1. Create the Google Sheet

Create a private Google Sheet with a tab named `Sheet1` and these columns in row 1:

```
certificate_id | student_name | program_name | completion_date | issue_date | status
```

`status` must be `active` or `revoked`. Example row:

```
GEE-2026-0001 | Rahul Sharma | Applied GenAI Engineering Program | June 2026 | July 2026 | active
```

Copy the spreadsheet ID from its URL:
`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_IS_HERE/edit`

## 2. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com).
2. Create a new project (e.g. "genaieducate-certificates").

## 3. Enable the Google Sheets API

1. In the project, go to **APIs & Services → Library**.
2. Search for "Google Sheets API" and click **Enable**.

## 4. Create a Service Account and download the key

1. Go to **APIs & Services → Credentials → Create Credentials → Service Account**.
2. Give it any name (e.g. "certificate-verifier").
3. Skip granting it project roles (not needed, access is via sheet sharing).
4. Open the new service account, go to the **Keys** tab, **Add Key → Create new key → JSON**.
5. A JSON file downloads. Keep it private, never commit it to git.

From that JSON file you need two values:
- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY`

## 5. Share the Google Sheet with the service account

1. Open the Google Sheet from step 1.
2. Click **Share**.
3. Paste the service account's `client_email` and give it **Viewer** access.
4. Uncheck "Notify people" and send.

## 6. Add environment variables locally

1. Copy `.env.local.example` to `.env.local`.
2. Fill in:
   - `GOOGLE_SHEETS_SPREADSHEET_ID` — from step 1
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — from step 4
   - `GOOGLE_PRIVATE_KEY` — from step 4, keep it wrapped in quotes with `\n` for line breaks, exactly as it appears in the JSON file
3. Restart `npm run dev` after adding the file.

## 7. Add environment variables on Vercel

1. Go to the project on [vercel.com](https://vercel.com) → **Settings → Environment Variables**.
2. Add the same three variables for the **Production** (and Preview, if used) environment.
3. Paste `GOOGLE_PRIVATE_KEY` exactly as in `.env.local`, including the `\n` sequences.
4. Redeploy for the variables to take effect.

## Issuing a new certificate

1. Add a row to the Google Sheet with the student's details and a new sequential `GEE-YYYY-XXXX` ID.
2. Generate the PDF locally:
   ```
   node scripts/generate-certificate.js --id GEE-2026-0001 --name "Rahul Sharma" --date "June 2026"
   ```
3. The PDF is written to `certificates/GEE-2026-0001.pdf`. Send it to the student.
