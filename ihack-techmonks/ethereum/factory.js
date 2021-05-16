import web3 from './web3';
import Factory from './build/Factory.json';

const instance = new web3.eth.Contract(
  JSON.parse(Factory.interface),
  '0xB5A5cfE50c3e0a4636844d1AA4e999E7e4A04254'
);

export default instance;
