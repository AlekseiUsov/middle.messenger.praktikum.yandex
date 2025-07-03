import { HTTPTransport } from "../../utils";

export class BaseApi {
  endpoint: string;
  http: HTTPTransport;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.http = new HTTPTransport(endpoint);
  }

  create() {
    throw new Error("not implementation");
  }

  request() {
    throw new Error("not implementation");
  }

  update() {
    throw new Error("not implementation");
  }

  delete() {
    throw new Error("not implementation");
  }
}
