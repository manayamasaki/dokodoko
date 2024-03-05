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
        purchased: parseInt(purchased), // バックエンドのデータ型に合わせて数値に変換
        // released: parseInt(released), // 同上
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('本の追加に失敗しました');
      }
      return response.text(); // レスポンスのテキストを取得
    })
    .then(data => {
      console.log('本が追加されました:', data);
      // フォームをクリアするためにステートをリセット
      setTitle('');
      setPurchased('');
      setReleased('');
    })
    .catch(error => {
      console.error('本の追加エラー:', error);
    });
  };

  return (
    <div>
      <h1>本を追加</h1>
      <form onSubmit={handleSubmit}>        
        <label>タイトル <input type="text" className="Title" value={title} onChange={(e) => setTitle(e.target.value)} /></label><br />
        <label>今持ってる巻数 <input type="number" className="Purchased" value={purchased} onChange={(e) => setPurchased(e.target.value)} /></label><br />
        
        <button type="submit">送信</button>
      </form>
    </div>
  );
};

export default Add;
