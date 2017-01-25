/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

/**
 * A-Frame Network System for A-Frame.
 */
AFRAME.registerSystem('network', {
  dependencies: ['position', 'rotation'],

  schema: {
    url: {
      type: 'string',
      default: null
    },
    port: {
      type: 'number',
      default: 4000
    },
    path: {
      type: 'string',
      default: '/chat'
    }
  },

  onNetworkConnect: function () {
    var self = this;
    // unfortunately, our position and rotation attributes aren't set when we call this
    self.socket.emit('spawn', {
      position: {x: 0, y: 0, z: 0},
      rotation: {x: 0, y: 0, z: 0}
    });
    self.socket.on('message', function (data) {
      console.log(data);
    }).on('spawn', function (data) {
      var entityEl = document.createElement('a-box');
      entityEl.setAttribute('network', {
        local: false,
        serverId: data.id
      });
      console.log("Spawning remote object: ", data.id);
      entityEl.setAttribute('position', data.position);
      entityEl.setAttribute('rotation', data.rotation);
      if (entityEl.components.material !== undefined) {
        entityEl.setAttribute('material', 'color', data.color);
      }
      var scene = document.querySelector('a-scene');
      scene.appendChild(entityEl);
      self.registerMe(entityEl);
    }).on('position', function (data) {
      var entityEl = self.entities[data.id];
      entityEl.setAttribute('position', data.position);
    }).on('rotation', function (data) {
      var entityEl = self.entities[data.id];
      entityEl.setAttribute('rotation', data.rotation);
    }).on('despawn', function (data) {
      console.log("Despawning remote object: ", data.id);
      var entityEl = self.entities[data.id];
      self.unregisterMe(entityEl);
      entityEl.parentNode.removeChild(entityEl);
    })
  },

  init: function () {
    this.entities = {};
    if (this.data.url == undefined || this.data.url == "") {
      this.data.url = location.protocol + '//' + location.hostname + ':' + this.data.port + this.data.path;
    }
    this.socket = io.connect(this.data.url);
    this.socket.on('connect', this.onNetworkConnect.bind(this));
  },

  registerMe: function (el) {
    this.entities[el.components.network.attrValue.serverId] = el;
  },

  unregisterMe: function (el) {
    delete this.entities[el.components.network.attrValue.serverId];
  },

  emit: function (message, data) {
    this.socket.emit(message, data);
  }
});

/**
 * A-Frame Network Component for A-Frame.
 */
AFRAME.registerComponent('network', {
  schema: {
    local: { type: 'boolean' },
    serverId: { type: 'string' }
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    if (this.data.local) {
      this.el.addEventListener('componentchanged', this.onComponentChanged.bind(this));
    }
  },

  onComponentChanged: function (evt) {
    if (evt.detail.name === 'position') {
      var oldData = this.lastPosition;
      var newData = evt.detail.newData;
      if (oldData == undefined || oldData.x !== newData.x || oldData.y !== newData.y || oldData.z !== newData.z) {
        this.system.emit('position', evt.detail.newData);
        this.lastPosition = newData;
      }
    } else if (evt.detail.name === 'rotation') {
      var oldData = this.lastRotation;
      var newData = evt.detail.newData;
      if (oldData == undefined || oldData.x !== newData.x || oldData.y !== newData.y || oldData.z !== newData.z) {
        this.system.emit('rotation', evt.detail.newData);
        this.lastRotation = newData;
      }
    }
  }
});
