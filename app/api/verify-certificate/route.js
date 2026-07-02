import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (10 requests per minute per IP)
const ipRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const limitWindow = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  if (!ipRequests.has(ip)) {
    ipRequests.set(ip, []);
  }
  
  const timestamps = ipRequests.get(ip).filter(t => now - t < limitWindow);
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  
  return timestamps.length > maxRequests;
}

export async function POST(request) {
  try {
    // 1. Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { status: 'error', message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { certificateId } = body;

    if (!certificateId || typeof certificateId !== 'string') {
      return NextResponse.json(
        { status: 'error', message: 'Certificate ID is required.' },
        { status: 400 }
      );
    }

    const queryId = certificateId.trim().toUpperCase();

    // 3. Check environment variables
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
      console.error('Missing Google Sheets configuration environment variables.');
      return NextResponse.json({ status: 'error' }, { status: 500 });
    }

    // 4. Authenticate and query Google Sheets
    const auth = new google.auth.JWT({
      email: serviceAccountEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:F', // Columns: certificate_id, student_name, program_name, completion_date, issue_date, status
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) {
      // Empty sheet or only headers
      return NextResponse.json({ status: 'not_found' });
    }

    // We assume:
    // Column 0: certificate_id
    // Column 1: student_name
    // Column 2: program_name
    // Column 3: completion_date
    // Column 4: issue_date
    // Column 5: status (active / revoked)
    const dataRows = rows.slice(1);
    
    const match = dataRows.find(row => row[0] && row[0].trim().toUpperCase() === queryId);

    if (!match) {
      return NextResponse.json({ status: 'not_found' });
    }

    const [id, studentName, programName, completionDate, issueDate, status] = match;
    const normalizedStatus = (status || '').trim().toLowerCase();

    if (normalizedStatus === 'revoked') {
      return NextResponse.json({ status: 'revoked' });
    }

    // Valid certificate state
    return NextResponse.json({
      status: 'valid',
      data: {
        certificateId: id,
        studentName: studentName || '',
        programName: programName || '',
        completionDate: completionDate || '',
        issueDate: issueDate || ''
      }
    });

  } catch (error) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
