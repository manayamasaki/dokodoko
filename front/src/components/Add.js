import React, { useState } from 'react';

const Add = () => {
  const [title, setTitle] = useState('');
  const [purchased, setPurchased] = useState('');
  const [released, setReleased] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        purchased: purchased,
        released: released,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      return response.json();
    })
    .then(data => {
      console.log('Book added:', data);
      // フォームをクリアするためにステートをリセット
      setTitle('');
      setPurchased('');
      setReleased('');
    })
    .catch(error => {
      console.error('Error adding book:', error);
    });
  };

  return (
    <div>
      <h1>登録機能</h1>
      <form onSubmit={handleSubmit}>        
        <label>タイトル <input type="text" className="Title" value={title} onChange={(e) => setTitle(e.target.value)} /></label><br />
        <label>購入済み <input type="number" className="Purchased" value={purchased} onChange={(e) => setPurchased(e.target.value)} /></label><br />
        <label>発売済み <input type="number" className="Released" value={released} onChange={(e) => setReleased(e.target.value)} /></label><br />
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Add;