import * as FluenceDeployment from "../fluence/deployment.json"

export const environment = {
  fleunceServices: FluenceDeployment.services,
  fluenceModules: FluenceDeployment.modules,
  relayNode: {
    multiaddr: "/ip4/127.0.0.1/tcp/4310/ws/p2p/12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3/",
    peerId: "12D3KooWKEprYXUXqoV5xSBeyqrWLpQLLH4PXfvVkDJtmcqmh5V3"
  },
  production: false
};
