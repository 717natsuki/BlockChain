const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const BlockChain = require("./blockchain");
const uuid = require('uuid/v1')
const nodeAddress = uuid().split('-').join('')

const bitcoin = new BlockChain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => res.send('Hello World!'))

app.get('/blockchain', function(req, res){
  res.send(bitcoin);
});

app.post('/transaction', function(req, res){
  // index will be returned
  const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.send(blockIndex.toString())
});


app.get('/mine', function(req, res){
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'];
  const currentBlockData = {
    transactions: bitcoin.pendingTransactions,
    index: lastBlock['index'] + 1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
  bitcoin.createNewTransaction(12.5, '00', nodeAddress);

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);



  res.json({
    note: "new block mined successfully",
    block: newBlock
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
