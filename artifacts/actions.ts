'use server';

import { getSuggestionsByDocumentId } from '@/lib/db/queries';
import type { Suggestion } from '@/lib/db/schema';

function isSuggestion(s: any): s is Suggestion {
  return (
    s &&
    typeof s.createdAt === 'string' &&
    typeof s.documentCreatedAt === 'string' &&
    typeof s.originalText === 'string' &&
    typeof s.suggestedText === 'string'
  );
}

export async function getSuggestions({ documentId }: { documentId: string }) {
  const suggestions = await getSuggestionsByDocumentId({ documentId });
  return (suggestions ?? [])
    .reduce((acc: any[], s: any) => {
      if (isSuggestion(s)) {
        acc.push({
          ...s,
          createdAt: new Date(s.createdAt),
          documentCreatedAt: new Date(s.documentCreatedAt),
        });
      }
      return acc;
    }, []);
}
