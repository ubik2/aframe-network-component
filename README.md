## aframe-network-component

Synchronizes transforms across the network

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.4.0/aframe.min.js"></script>
  <script src="https://unpkg.com/socket.io-client/dist/socket.io.min.js"></script>
  <script src="https://unpkg.com/aframe-network-component/dist/aframe-network-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity network="local: true"></a-entity>
  </a-scene>
</body>
```

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:

```sh
angle install aframe-network-component
```
-->

#### npm

Install via npm:

```bash
npm install aframe-network-component
```

Then require and use.

```js
require('aframe');
require('aframe-network-component');
```
