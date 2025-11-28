import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded.' }, { status: 400 });
    }

    // In a real application, you would process the files here:
    // - Save them to a secure storage (like S3)
    // - Add them to a queue for parsing
    // - Update a database with file metadata

    console.log(`${files.length} file(s) received.`);

    return NextResponse.json({
      message: `${files.length} statement(s) uploaded successfully. We'll start processing them shortly.`
    });

  } catch (error) {
    console.error('Error in upload-statement API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
