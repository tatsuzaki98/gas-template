// HTTPのGET通信をする。ページにアクセスするとこの関数が呼ばれる。
function doGet() {
  // 左のタブにあるindex.htmlを取得
  var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
 
  // HTMLのheader要素はここで定義する(index.htmlのheader要素は無視されるので注意)
  htmlOutput
    .setTitle('叡風会共有ファイル')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
  
  return htmlOutput;
}



// 表からデータをとってきてHTMLに変換する
function getMainSheetData() {
  // 表からデータを取得
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('mainSheet').getDataRange().getValues();
  
  // データをHTMLに変換
  var response = '';
  for(var i=1; i<data.length; i++){
    response += '<div><a target="_blank" href="' + data[i][1] + '">開く</a><span>' + data[i][0] + '</span></div>';
  }
  return response;
}



// 会員確認の４桁の数字を検証する
function authorization(authToken) {
  // validTokenは、正しい番号を"48ee7651b9e99a511216b827"でSHA256ハッシュ関数にかけた値
  const validToken = 'b867e63d3b88ceec565fff066011487b84ae9c8105fca96309749b33088072fe';
  
  if (authToken === validToken) {
    // 数字が合ってれば、上で定義したgetMainSheetDataを返す
    return {'data': getMainSheetData(), 'status': 200};
  }else{
    // 数字が違う場合ガイドテキストのみ返す
    return {'data': '数字が違います', 'status': 403};
  }
}


// ファイル簡易検索
function searchFile(query) {
  // 表からデータを取得
  var data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('fileListSheet').getDataRange().getValues();
  
  // 線形探索してqueryに一致する要素をHTMLに成形
  var response = '';
  for(var i=1; i<data.length; i++){
    if (data[i][1].indexOf(query) >= 0){
      var paragraph = '<p class="form-each-result">' + data[i][0] + '/' + data[i][1];
      if (data[i][2].length > 0){
        paragraph += '/' + data[i][2]
      }
      if (data[i][3].length > 0){
        paragraph += '/' + data[i][3]
      }
      response += paragraph + '</p>';
    }
  }
  
  // 0件一致ならガイドテキストを返す
  if (response.length == 0){
    return '<p>ファイルが見つかりませんでした。表記違いなどを確認してください。(根引きの松→根曳の松 など)</p>';
  } else {
    return response;
  }
}
