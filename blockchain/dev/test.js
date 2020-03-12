const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();

bitcoin.createNewBlock(2842, 'Natsuki', 'other person  ');
bitcoin.createNewTransaction(9232,'you','me')




console.log(bitcoin.proofOfWork('OSDIJFOS', bitcoin.chain[0]));
