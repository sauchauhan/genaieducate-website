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
3. Paste the service account's `client_email` and give it **Editor** access.
4. Uncheck "Notify people" and send.

Editor access (not just Viewer) is required because `scripts/generate-certificate.js` appends
a row automatically when it issues a certificate. The public `/verify` page's API route only
ever requests read-only scope, so it can never write even though the underlying service
account has edit rights on the sheet.

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

1. Generate the PDF locally:
   ```
   node scripts/generate-certificate.js --name "Rahul Sharma" --date "June 2026"
   ```
2. The script auto-generates a random certificate ID (e.g. `GEE-2026-7K3F9Q`), writes the PDF to
   `certificates/<id>.pdf`, and — since credentials are configured — appends the matching row to
   the Google Sheet for you. Watch the console output for confirmation.
3. If the Sheet couldn't be reached (network issue, permissions not yet updated, etc.), the
   script prints the row instead so you can add it by hand.
4. Send the PDF to the student.

To pin a specific ID instead of a random one (e.g. to match an already-issued certificate),
pass `--id GEE-2026-0001` explicitly.
