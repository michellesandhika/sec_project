import { Web3Storage } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDI4ODBGNDhiYmI4OGNhNTQ0ZjI0RDViMzY3YjAxMzBGOENmMTk5QTIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDc4NTY2Mjc1NDYsIm5hbWUiOiJtYXN0ZXJ0b2tlbiJ9.c_g0CXrtFGRfk6KfwwamytbrUziyrNMv45psKfJSsn0";
  //return process.env.WEB3STORAGE_TOKEN
}

export const makeStorageClient = new Web3Storage({ token: getAccessToken() });
