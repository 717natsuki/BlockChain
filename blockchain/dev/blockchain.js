const sha256 = require ('sha256');

function BlockChain(){
  this.chain = [];
  this.pendingTransactions = [];

  // needs to create first block
  this.createNewBlock(0, '0', '0');
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

// previousBlockHash -> 前回のハッシュした値
// currentBlockData ->　今回の「トランズアクション」の値（JSON）
// nance ->
// この関数は今回のハッシュ値を出力する関数
BlockChain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nance){
  const dataString = previousBlockHash + nance.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(dataString);
  return hash;
}

// hashblockでハッシュをつくりまくり、proofOfWorkでそのハッシュでいいのか確認する。
BlockChain.prototype.proofOfWork = function(previousBlockHash, currentBlockData){
  let nance = 0;
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nance)

  // ハッシュ値の最初の四文字が0000の時だけNanceを出力する。
  while(hash.substring(0,4) !== '0000'){
    nance ++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nance)
    console.log(hash);
  }
  return nance;
}


module.exports = BlockChain;
