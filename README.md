This is a simple project that demonstrates how to use the Kontex [JavaScript SDK](https://docs.kontext.so/sdk/js).

## Getting Started

1. Clone the repository

```bash
git clone git@github.com:kontextso/sdk-js-demo.git
cd sdk-js-demo
```

2. Update your publisher token and placement code.

Open `main.js` and update the publisher token:

```ts
export const PUBLISHER_TOKEN = "<your publisher token>";
```

Open `index.html` and update the publisher token:

```html
<script src="https://server.kontext.so/sdk/js?type=global&publisherToken=your-publisher-token>"></script> 
```

3. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:5174/](http://localhost:5174) in your browser to see the result.


## Learn More

To learn more about the Kontext JavaScript SDK, check out the following resource:

- [Kontext JavaScript SDK Documentation](https://docs.kontext.so/sdk/js)
