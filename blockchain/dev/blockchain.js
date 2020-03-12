const sha256 = require ('sha256');

function BlockChain(){
  this.chain = [];
  this.pendingTransactions = [];
}

// 新しいブロックを作成するメソッド。
BlockChain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {

  // newBlock作成されたブロック
  const newBlock = {

    // インデックス番号（今何番目か）
    index: this.chain.length + 1,

    // 時間
    timestamp: Date.now(),

    // トランズアクションは変更不可能なためここに保存
    transactions: this.pendingTransactions,

    // チェーンのため一個前のハッシュとつながっていないといけない
    previousBlockHash: previousBlockHash,

    hash: hash,

    nonce: nonce,
  }

// 先ほどpendingTransactionsに追加したため毎回クリーンアップしたい。
  this.pendingTransactions = [];

  // 今回のブロックをchain array に入れる
  this.chain.push(newBlock);

  return newBlock;
};



// このメソッドで毎回最後のブロックを出力できるようになる
BlockChain.prototype.getLastBlock = function () {
  return this.chain[this.chain.length - 1];
};



// お支払い（トランズアクション）が完了したら起きるメソッド。pendingTransactionsはまだ実際に認証されたわけではない。
BlockChain.prototype.createNewTransaction = function(amount, sender, recipient){
  const newTransactions = {
    amount: amount,
    sender: sender,
    recipient: recipient,
  };

  // このPendingTransactionsの配列に入れた後、createNewBlockで認証するこれが正しいか
  this.pendingTransactions.push(newTransactions);
  return this.getLastBlock()['index'] + 1;
}

BlockChain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nance){
  const dataString = previousBlockHash + nance.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataString);
  return hash;
}


module.exports = BlockChain;
