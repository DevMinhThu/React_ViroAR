'use strict';

import React, {Component} from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroMaterials,
  ViroAmbientLight,
  ViroSpotLight,
  Viro3DObject,
  ViroNode,
  ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        {/* <ViroBox
          position={[0, 0.5, -1]} //[x,y,z] location
          scale={[0.3, 0.3, 0.3]} // Object Size
          materials={['rocker']}
        /> */}

        <ViroAmbientLight color={'black'} />
        <ViroSpotLight
          position={[0, -0.25, 0]}
          color="#ffffff"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={50}
        />

        <ViroNode
          dragType="FixedToWorld"
          position={[0, 0, 0]}
          rotation={[0, 45, 45]}
          scale={[2.0, 2.0, 2.0]}
          onDrag={() => {}}>
          <Viro3DObject
            source={require('./res/emoji_smile/world/earth.obj')}
            position={[0, -0.5, -1]}
            scale={[0.2, 0.2, 0.2]}
            type="OBJ"
            animation={{name: 'rotate', run: true, loop: true}}
          />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Hello World!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  rocker: {
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/rocker.jpg'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateX: '+=90',
      rotateY: '+=45',
      rotateZ: '+=50',
      translateX: '+=5',
      translateY: '+=5',
      translateZ: '+=5',
      opacity: '1',
    },
    duration: 1000, //.25 seconds
  },
});



module.exports = HelloWorldSceneAR;
