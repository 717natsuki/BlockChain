const BlockChain = require('./blockchain');

const bitcoin = new BlockChain();

bitcoin.createNewBlock(2842, 'Natsuki', 'other person  ');
bitcoin.createNewTransaction(9232,'you','me')

bitcoin.createNewBlock(1432, 'IDSJOS', 'OOFOSSSDKSD');
bitcoin.createNewTransaction(8232,'you','me')

bitcoin.createNewBlock(084, 'DOISODSISVSDG', 'SDIOOS');
bitcoin.createNewTransaction(1232,'you','me')
bitcoin.createNewTransaction(2232,'you','me')
bitcoin.createNewTransaction(3232,'you','me')
bitcoin.createNewBlock(084, 'DOISODSISVSDG', 'SDIOOS');


console.log(bitcoin.chain[3]);
