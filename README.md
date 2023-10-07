# ICPJS

A Javascript library to perform the iterative closest point (ICP) algorithm on two 2D point clouds.

### Installation
```
npm install git+https://git@github.com/eriknoorland/icpjs.git
```

### Usage
```html
<script src="icpjs.min.js"></script>
```

```js
const reference = [{ x, y }];
const points = [{ x, y }];
const pose = { x, y, phi };

const result = window.icpjs.run(reference, points, pose, {
  method: window.icpjs.methods.POINT_TO_PLANE,
  maxIterations: 30,
  tolerance: 2,
});
```

### Function arguments

#### reference
The reference is a 2D point cloud that is used as a map for the algorithm to find the translation and rotation it needs to perform on the points data.

#### points
These are the points you would like to match against the reference and find the translation and rotation for to align the points cloud to the reference cloud.

#### pose [optional]
An object { x, y, phi } representing the estimated pose of where the points where taken from (used in my robotics project to help localize the robot based on a map). It defaults to `{ x: 0, y: 0, phi: 0 }`.

#### options [optional]

##### method
The method option allows you to choose between point-to-point or point-to-plane ICP. The default value is `methods.POINT_TO_POINT`.

##### maxIterations
This is used to set the maximum number of times the algorithm will try to find the best possible transformation and rotation. The default value is `20`.

##### tolerance
This is the amount the algorithm is allowed to be off to still be considered successful. The default value is `0.1`.