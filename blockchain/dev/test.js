function BlockChain(){
  this.chain = [];
  this.newTransactions = [];
}

BlockChain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
  const newBlock = {
    // インデックス番号（今何番目か）
    index: this.chain.length + 1,
    // 時間
    timestamp: Date.now(),
    // トランズアクションは変更不可能なためここに保存
    transactions: this.newTransactions,
    // チェーンのため一個前のハッシュとつながっていないといけない
    previousBlockHash: previousBlockHash,
    hash: hash,
    nonce: nonce,
  }

// 先ほどnewTransactionsに追加したため毎回クリーンアップしたい。
  this.newTransactions = [];
  // 今回のブロックをchain array に入れる
  this.chain.push(newBlock);
  return newBlock;
};
