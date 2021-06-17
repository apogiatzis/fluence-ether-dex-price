import { Injectable } from '@angular/core';
import { createClient, FluenceClient, Particle, sendParticleAsFetch } from '@fluencelabs/fluence';
import { UUID } from 'angular2-uuid';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class FluenceCurlService {
  client: FluenceClient;

  constructor() {
    this.getClient();
  }

  async getClient() {
    if ((this.client) && (this.client.isConnected)) {
      return this.client
    } else {
      this.client = await createClient(environment.relayNode);
      return this.client;
    }
  }

  async request(airScript: string, extraParams: Map<string, any>, ttl: number = 5000) {
    const client = await this.getClient();

    let callbackId = UUID.UUID();
    const params = new Map();

    params.set('node', environment.fleunceServices.curl.node);
    params.set('serviceId', environment.fleunceServices.curl.id);
    params.set('myRelay', this.client.relayPeerId);
    params.set('myPeerId', this.client.selfPeerId);
    params.set('callback', callbackId);

    extraParams.forEach((value, name) => {
      params.set(name, value);
    })

    let result = await sendParticleAsFetch<any>(client, new Particle(airScript, params, ttl), callbackId);
    result = result[0];
    if (result.error) {
      throw new Error('Error invoking function at fluence node');
    }

    if (result.stderr) {
      throw new Error(`Error from curl binary. ${result.stderr}.Return code ${result.ret_code}.`);
    }

    return result.stdout;
  }

  async getRequest(url: String, ttl: number) {
    const script = `
    (seq
        (call myRelay ("op" "identity") [])
        (seq
            (call node (serviceId "get_request") [url] result)
            (seq
                (call myRelay ("op" "identity") [])
                (call myPeerId ("_callback" callback) [result])
            )
        )
    )
    `;

    const args = new Map();
    args.set('url', url);
    return this.request(script, args, ttl);
  }

  async postRequest(url: String, body: string, ttl: number) {
    const script = `
      (seq
          (call myRelay ("op" "identity") [])
          (seq
              (call node (serviceId "post_request") [url body] result)
              (seq
                  (call myRelay ("op" "identity") [])
                  (call myPeerId ("_callback" callback) [result])
              )
          )
      )
      `;

    const args = new Map();
    args.set('url', url);
    args.set('body', body);
    return this.request(script, args, ttl);
  }
}
