import React, {Component} from 'react';

import {
  ViroARScene,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroUtils,
  ViroQuad,
  ViroSpotLight,
  Viro3DObject,
  ViroAnimations,
} from 'react-viro';

import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';

var createReactClass = require('create-react-class');

var ARHitTestSample = createReactClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      objPosition: [0, 0, 0],
      scale: [0.2, 0.2, 0.2],
      rotation: [0, 0, 0],
    };
  },

  render: function() {
    return (
      <ViroARScene ref="arscene">
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {this._getModel()}
      </ViroARScene>
    );
  },

  _getModel() {
    var modelArray = [];
    modelArray.push(
      <ViroNode
        position={this.state.objPosition}
        onDrag={() => {}}
        scale={this.state.scale}
        rotation={this.state.rotation}
        dragType="FixedToWorld">
        <ViroSpotLight
          innerAngle={5}
          outerAngle={20}
          direction={[0, -1, 0]}
          position={[0, 4, 0]}
          color="#ffffff"
          castsShadow={true}
          shadowNearZ={0.1}
          shadowFarZ={6}
          shadowOpacity={0.9}
        />

        <Viro3DObject
          source={require('./res/emoji_smile/world/earth.obj')}
          position={[0, 0.5, 0]}
          scale={[0.2, 0.2, 0.2]}
          type="OBJ"
          onPinch={this._onPinch}
        />
        <ViroQuad
          rotation={[-90, 0, 0]}
          position={[0, -0.001, 0]}
          width={2.5}
          height={2.5}
          arShadowReceiver={true}
          ignoreEventHandling={true}
        />
      </ViroNode>,
    );
    return modelArray;
  },

  /*
     Pinch scaling should be relative to its last value *not* the absolute value of the
     scale factor. So while the pinching is ongoing set scale through setNativeProps
     and multiply the state by that factor. At the end of a pinch event, set the state
     to the final value and store it in state.
     */
  _onPinch(pinchState, scaleFactor, source) {
    var newScale = this.state.scale.map(x => {
      return x * scaleFactor;
    });

    if (pinchState == 3) {
      this.setState({
        scale: newScale,
      });
      return;
    }

    this.arNodeRef.setNativeProps({scale: newScale});
    this.spotLight.setNativeProps({shadowFarZ: 6 * newScale[0]});
  },
});

module.exports = ARHitTestSample;
