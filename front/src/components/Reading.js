import React, { useEffect, useState } from 'react';

function Reading() {
  const [BookshelfUsersInformation, setBookshelfUsersInformation] = useState([]);

  useEffect(() => {
    fetch('/register') // バックエンドのエンドポイントにリクエストを送信
      .then(response => response.json())
      .then(data => {
        console.log(data); // データが正しく取得できているか確認するためにコンソールログに出力
        setBookshelfUsersInformation(data); // 取得したデータをstateにセット
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
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update-counter/" + bookId + "?change=" + change, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        // 更新が成功した場合は、ページをリロードして変更を反映する
        window.location.reload();
      } 
    };
    xhr.send();
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
        {BookshelfUsersInformation.map(value => (
          <tr key={value.Id}>
            <td>{value.Title}</td>
            <td>{value.Purchased}</td>
            <td>
              <button className="plus" onClick={() => updateCounter(value.Id, 1, value.Purchased)}>+</button>
              <button className="minus" onClick={() => updateCounter(value.Id, -1, value.Purchased)}>-</button>
            </td>
            <td>{value.Released}</td>
            {/* <td><a href={`/edit/${value.Id}`}>編集</a></td> */}
            <td><a href={`/delete/${value.Id}`}>削除</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Reading;