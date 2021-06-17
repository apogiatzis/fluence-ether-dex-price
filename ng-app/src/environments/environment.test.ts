import * as FluenceDeployment from "../fluence/deployment.json"
import { krasnodar } from '@fluencelabs/fluence-network-environment';

export const environment = {
  fleunceServices: FluenceDeployment.services,
  fluenceModules: FluenceDeployment.modules,
  relayNode: krasnodar[3],
  production: false
};
