import web3 from './web3';
import Healthhub from './build/HealthHub.json';

export default address => {
  return new web3.eth.Contract(JSON.parse(Healthhub.interface), address);
};
