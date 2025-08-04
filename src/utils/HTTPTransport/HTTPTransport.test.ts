import { BASE_URL, HTTPTransport, METHOD } from "./HTTPTransport";

const url = "/mockUrl";
const endPoint = "/mockEndPoint";
const mockedOptions = { data: { mockKey: "mockValue" } };
const path = `${BASE_URL}${endPoint}${url}`;

const http = new HTTPTransport(endPoint);
const mockXMLHttpRequest = {
  open: jest.fn(),
  setRequestHeader: jest.fn(),
  send: jest.fn(),
} as unknown as jest.Mocked<XMLHttpRequest>;

XMLHttpRequest = jest.fn(
  () => mockXMLHttpRequest,
) as unknown as typeof XMLHttpRequest;

beforeEach(() => {
  jest.clearAllMocks();
});

it("проверяем get запроc", async () => {
  http.get(url, {});

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith("GET", path);
  expect(mockXMLHttpRequest.send).toHaveBeenCalled();
});

it("проверяем get запроc c параметрами", async () => {
  http.get(url, mockedOptions);

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith(
    "GET",
    `${path}?mockKey=mockValue`,
  );
  expect(mockXMLHttpRequest.send).toHaveBeenCalled();
});

it("тестируем post запрос", async () => {
  const options = { method: METHOD.POST, ...mockedOptions };

  http.request(BASE_URL + endPoint + url, options);

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith("POST", path);
  expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith(
    "Content-type",
    "application/json",
  );
  expect(mockXMLHttpRequest.send).toHaveBeenCalledWith(
    JSON.stringify({ ...mockedOptions.data }),
  );
});

it("проверяем post запрос с FormData", async () => {
  const formData = new FormData();
  formData.append("key", "value");

  const options = { method: METHOD.POST, data: formData };

  http.request(BASE_URL + endPoint + url, options);

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith(
    "POST",
    `${BASE_URL}${endPoint}${url}`,
  );
  expect(mockXMLHttpRequest.setRequestHeader).not.toHaveBeenCalled();
  expect(mockXMLHttpRequest.send).toHaveBeenCalledWith(formData);
});

it("проверяем put запрос", async () => {
  http.put(url, mockedOptions);

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith("PUT", path);
  expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith(
    "Content-type",
    "application/json",
  );
  expect(mockXMLHttpRequest.send).toHaveBeenCalledWith(
    JSON.stringify({ mockKey: "mockValue" }),
  );
});

it("проверяем delete запрос", async () => {
  http.delete(url, mockedOptions);

  expect(mockXMLHttpRequest.open).toHaveBeenCalledWith("DELETE", path);
  expect(mockXMLHttpRequest.setRequestHeader).toHaveBeenCalledWith(
    "Content-type",
    "application/json",
  );
  expect(mockXMLHttpRequest.send).toHaveBeenCalledWith(
    JSON.stringify({ mockKey: "mockValue" }),
  );
});
