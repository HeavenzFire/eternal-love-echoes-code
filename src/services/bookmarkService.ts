
interface Bookmark {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  type: 'knowledge' | 'historical' | 'code' | 'custom';
  tags?: string[];
  notes?: string;
  source?: string;
  url?: string;
}

// Storage key in localStorage
const BOOKMARKS_STORAGE_KEY = 'cosmic_bookmarks';

/**
 * Get all bookmarks from localStorage
 */
export const getAllBookmarks = (): Bookmark[] => {
  const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
  return storedBookmarks ? JSON.parse(storedBookmarks) : [];
};

/**
 * Get bookmarks filtered by type
 */
export const getBookmarksByType = (type: Bookmark['type']): Bookmark[] => {
  const allBookmarks = getAllBookmarks();
  return allBookmarks.filter(bookmark => bookmark.type === type);
};

/**
 * Add a new bookmark
 */
export const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark => {
  const allBookmarks = getAllBookmarks();
  
  // Check if bookmark with same title and category already exists
  const existingIndex = allBookmarks.findIndex(
    b => b.title === bookmark.title && b.category === bookmark.category
  );
  
  if (existingIndex >= 0) {
    throw new Error('A bookmark with this title already exists');
  }
  
  const newBookmark: Bookmark = {
    ...bookmark,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  
  const updatedBookmarks = [...allBookmarks, newBookmark];
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updatedBookmarks));
  
  return newBookmark;
};

/**
 * Remove a bookmark by its ID
 */
export const removeBookmark = (id: string): void => {
  const allBookmarks = getAllBookmarks();
  const updatedBookmarks = allBookmarks.filter(bookmark => bookmark.id !== id);
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updatedBookmarks));
};

/**
 * Update an existing bookmark
 */
export const updateBookmark = (id: string, updates: Partial<Omit<Bookmark, 'id' | 'createdAt'>>): Bookmark => {
  const allBookmarks = getAllBookmarks();
  const bookmarkIndex = allBookmarks.findIndex(bookmark => bookmark.id === id);
  
  if (bookmarkIndex === -1) {
    throw new Error('Bookmark not found');
  }
  
  const updatedBookmark = {
    ...allBookmarks[bookmarkIndex],
    ...updates
  };
  
  allBookmarks[bookmarkIndex] = updatedBookmark;
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(allBookmarks));
  
  return updatedBookmark;
};

/**
 * Check if an item is bookmarked by title and category
 */
export const isBookmarked = (title: string, category: string): boolean => {
  const allBookmarks = getAllBookmarks();
  return allBookmarks.some(
    bookmark => bookmark.title === title && bookmark.category === category
  );
};

/**
 * Search bookmarks by query
 */
export const searchBookmarks = (query: string): Bookmark[] => {
  if (!query.trim()) return [];
  
  const allBookmarks = getAllBookmarks();
  const lowerQuery = query.toLowerCase();
  
  return allBookmarks.filter(bookmark =>
    bookmark.title.toLowerCase().includes(lowerQuery) ||
    bookmark.category.toLowerCase().includes(lowerQuery) ||
    bookmark.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    bookmark.notes?.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get bookmark tags with counts
 */
export const getBookmarkTags = (): {tag: string, count: number}[] => {
  const allBookmarks = getAllBookmarks();
  const tagCounts: Record<string, number> = {};
  
  allBookmarks.forEach(bookmark => {
    if (bookmark.tags) {
      bookmark.tags.forEach(tag => {
        if (!tagCounts[tag]) {
          tagCounts[tag] = 0;
        }
        tagCounts[tag]++;
      });
    }
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Export bookmarks as JSON
 */
export const exportBookmarks = (): string => {
  const allBookmarks = getAllBookmarks();
  return JSON.stringify(allBookmarks, null, 2);
};

/**
 * Import bookmarks from JSON string
 */
export const importBookmarks = (jsonData: string): void => {
  try {
    const parsedData = JSON.parse(jsonData) as Bookmark[];
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(parsedData));
  } catch (error) {
    throw new Error('Invalid bookmark data format');
  }
};

// Helper function to generate unique IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};
