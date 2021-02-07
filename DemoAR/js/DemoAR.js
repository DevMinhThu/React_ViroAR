import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroConstants,
  ViroMaterials,
  ViroAmbientLight,
  ViroSphere,
  ViroDirectionalLight,
  ViroAnimations,
  Viro3DObject,
} from 'react-viro';

export default class DemoAR extends Component {
  constructor() {
    super();

    this.state = {
      text: 'AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroSphere
          onDrag={position => {
            console.log(
              'Dragged to: x' +
                position[0] +
                ' y:' +
                position[1] +
                ' z: ' +
                position[2],
            );
          }}
          position={[0, 0, -1]}
          radius={0.1}
          materials={['moon']}
          animation={{name: 'moonRotate', run: true, loop: true}}
        />

        <ViroSphere
          onDrag={position => {
            console.log(
              'Dragged to: x' +
                position[0] +
                ' y:' +
                position[1] +
                ' z: ' +
                position[2],
            );
          }}
          position={[0.3, 0, -1]}
          radius={0.15}
          materials={['sun']}
          animation={{name: 'sunRotate', run: true, loop: true}}
        />

        <Viro3DObject
          onDrag={position => {
            console.log(
              'Dragged to: x' +
                position[0] +
                ' y:' +
                position[1] +
                ' z: ' +
                position[2],
            );
          }}
          source={require('./res/ImgTest/Mustang/Mustang.obj')}
          position={[0, 0, 1]}
          scale={[0.0005, 0.0005, 0.0005]}
          type="OBJ"
          materials={['Alien']}
        />

        <ViroAmbientLight color="#ffffff" intensity={150} />
        <ViroDirectionalLight
          color="#ffffff"
          direction={[0.5, -1, 0.5]}
          castShadow={true}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Smart',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  }
}

// Handler materials
ViroMaterials.createMaterials({
  moon: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/ImgTest/moon.jpg'),
  },
  sun: {
    shininess: 5.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/ImgTest/sun.jpg'),
  },
  Alien: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/ImgTest/Mustang/BodyTexture.bmp'),
  },
});

// Handler animations
ViroAnimations.registerAnimations({
  moonRotate: {
    properties: {
      rotateY: '+=45',
    },
    duration: 600,
  },
});

ViroAnimations.registerAnimations({
  sunRotate: {
    properties: {
      rotateY: '+=45',
    },
    duration: 2000,
  },
});

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontSize: 30,
    color: 'green',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = DemoAR;
