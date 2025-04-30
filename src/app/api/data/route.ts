import { db } from '../db/db.config';
import { ref, get, push, remove } from 'firebase/database';
import { NextRequest, NextResponse } from 'next/server';

type Snippet = {
  snippetName: string;
  codeSnippet: string;
  snippetNote?: string;
  language: string;
};

// GET: Retrieve all snippets
export async function GET() {
  try {
    const snippetsRef = ref(db, 'snippets');
    const snapshot = await get(snippetsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Type-safe transformation to array
      const snippetsArray = Object.entries(data).map(([id, snippet]) => {
        const typedSnippet = snippet as Snippet;
        return {
          id,
          ...typedSnippet
        };
      });

      return NextResponse.json(snippetsArray);
    } else {
      return NextResponse.json({ error: 'No snippets found' }, { status: 404 });
    }
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch snippets' }, { status: 500 });
  }
}

// POST: Add a new code snippet
export async function POST(req: NextRequest) {
  try {
    const { snippetName, codeSnippet, snippetNote, language } = await req.json();

    // Validation
    if (!snippetName || !codeSnippet || !language) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const snippetsRef = ref(db, 'snippets');

    const newSnippetRef = await push(snippetsRef, {
      snippetName,
      codeSnippet,
      snippetNote: snippetNote || '',
      language
    });

    return NextResponse.json({ success: true, id: newSnippetRef.key });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ error: 'Failed to save snippet' }, { status: 500 });
  }
}

// DELETE: Delete a specific code snippet by ID
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();  // Get the snippet ID from the request body

    if (!id) {
      return NextResponse.json({ error: 'Snippet ID is required' }, { status: 400 });
    }

    const snippetRef = ref(db, `snippets/${id}`);

    // Remove the snippet from the database
    await remove(snippetRef);

    return NextResponse.json({ success: true, message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete snippet' }, { status: 500 });
  }
}
