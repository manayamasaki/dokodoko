import React, { useEffect, useState } from 'react';

function Reading() {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    fetch('/user/:loginid') // バックエンドのエンドポイントにリクエストを送信
      .then(response => response.json())
      .then(data => {
        console.log(data); // データが正しく取得できているか確認するためにコンソールログに出力
        setBookshelf(data); // 取得したデータをstateにセット
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function updateCounter(bookId, change, purchased) {
    if (parseInt(purchased) < 1 && change < 1) {
      return;
    }
    
    // AJAXリクエストを使ってサーバーに更新を送信する 
    fetch(`/update-counter/${bookId}?change=${change}`, {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
        // 更新が成功した場合は、ページをリロードして変更を反映する
        window.location.reload();
      } else {
        throw new Error('Failed to update counter');
      }
    })
    .catch(error => {
      console.error('Error updating counter:', error);
    });
  }

  function deleteBook(bookId) {
    // AJAXリクエストを使ってサーバーに削除を送信する 
    fetch(`/delete/${bookId}`, {
      method: 'GET'
    })
    .then(response => {
      if (response.ok) {
        // 削除が成功した場合は、ページをリロードして変更を反映する
        window.location.reload();
      } else {
        throw new Error('Failed to delete book');
      }
    })
    .catch(error => {
      console.error('Error deleting book:', error);
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>購入済み</th>
          <th>カウンター</th>
          <th>発売済み</th>
          <th>更新</th>
          <th>削除</th>
        </tr>
      </thead>
      <tbody>
        {bookshelf.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.purchased}</td>
            <td>
              <button className="plus" onClick={() => updateCounter(book.id, 1, book.purchased)}>+</button>
              <button className="minus" onClick={() => updateCounter(book.id, -1, book.purchased)}>-</button>
            </td>
            <td>{book.released}</td>
            <td><a href={`/update-counter/${book.id}`}>更新</a></td>
            <td><button onClick={() => deleteBook(book.id)}>削除</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Reading;

 