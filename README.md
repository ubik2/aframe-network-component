## aframe-network-component

Synchronizes transforms across the network

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Note

When I wrote this component, there weren't other good options for networking.
Since then, the networked-aframe component has been developed, and is actively being developed. I suggest you use that component instead.

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.4.0/aframe.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.slim.js"></script>
  <script src="https://unpkg.com/aframe-network-component@1.0.0/index.js"></script>
</head>

<body>
  <a-scene>
    <a-entity id="player" camera wasd-controls look-controls position="0 0.5 0.5" network="local: true"></a-entity>
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

### Getting started

If you've just checked out the repository, and want to try things out, here's some quick steps to get started.

#### Install dependencies
```sh
npm install
```

#### Build client files
```sh
npm run-script build
```

#### Launch the browser
```sh
npm start
```

At this point, click on the `Basic` link, and you should see a basic scene. You can move with the cursor keys.

#### Start the server
In a different window, you'll want to launch the server.

```sh
node server/network-server.js
```

### Overview
Basically, the node server just listens for incoming messages, and relays data to all the connected clients. The clients send the server properties for their player avatar (which is just a cube).
