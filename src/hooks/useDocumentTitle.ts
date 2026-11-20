import { useEffect } from 'react';

// Task 4: updates the browser tab title whenever the page's title changes.
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Product Explorer`;
  }, [title]);
}
