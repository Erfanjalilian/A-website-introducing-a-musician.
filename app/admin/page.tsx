'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug, content }),
      });

      if (res.ok) {
        setMessage('✅ Page created successfully');
        setTitle('');
        setSlug('');
        setContent('');
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error creating page');
    }
  };

  return (
    <div style={{ padding: '60px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Create New Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginTop: '20px' }}
        />

        <input
          type="text"
          placeholder="Slug (example: about-me)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginTop: '20px' }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          style={{ width: '100%', padding: '10px', marginTop: '20px' }}
        />

        <button
          type="submit"
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Create Page
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          {message}
        </p>
      )}
    </div>
  );
}
