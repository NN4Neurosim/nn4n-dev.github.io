---
title: Methods
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 10
---

# mask.visualize( )

##### Description

Print out the generated masks.

##### Usage
The example below will create a `MultiArea` object with 3 areas. `mask.visualize()` is called to print out the generated masks.

```python
area_connectivities = np.array([
    [1.0, 0.1, 0.02],
    [0.1, 1.0, 0.1],
    [0.02, 0.1, 1.0]
])
n_areas = [10, 50, 40]
params = {
    "n_areas": n_areas,
    "area_connectivities": area_connectivities,
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
    "input_areas": [0],
    "readout_areas": [1],
}

multiarea = MultiArea(**params)
multiarea.visualize()
```

Output:

<p>
  <img src="{{ '/assets/images/mask/input_mask.png' | relative_url }}" width="400">
</p>
<p>
  <img src="{{ '/assets/images/mask/hidden_mask.png' | relative_url }}" width="400">
</p>
<p>
  <img src="{{ '/assets/images/mask/readout_mask.png' | relative_url }}" width="400">
</p>


# mask.masks( )
##### Description
Return layer masks in a list.

##### Returns
> `masks`: (list) A list of masks. Each mask is a 2D numpy array.

##### Usage
```python
import torch
from nn4n.mask import MultiArea

params = {
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
}
multiarea = MultiArea(**params)
multiarea.masks()
```

Output
The first np.ndarray is the input mask, the second is the hidden mask, and the third is the readout mask.
```
[array([[1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
          ...
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.],
        [1., 1.]]),
 array([[1., 1., 1., ..., 0., 0., 1.],
        [1., 1., 1., ..., 0., 0., 0.],
        [1., 1., 1., ..., 0., 0., 1.],
        ...,
        [0., 0., 0., ..., 1., 1., 1.],
        [0., 0., 0., ..., 1., 1., 1.],
        [0., 0., 1., ..., 1., 1., 1.]]),
 array([[1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1.],
        [1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1.,
         1., 1.]])]
```


# mask.get_readout_idx( )
##### Description

Get the indices of the neurons that are being read out from.

##### Returns
> `readout_idx`: (np.ndarray) The indices of the neurons that are being read out from.

##### Usage
```python
import torch
from nn4n.mask import MultiArea

params = {
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
}
multiarea = MultiArea(**params)
multiarea.get_readout_idx()
```

Output
```
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
       17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
       34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
       51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
       68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
       85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99])
```

# mask.get_input_idx( )
##### Description
Get the indices of the neurons that receive inputs.

##### Returns
> `input_idx`: (np.ndarray) The indices of the input neurons. Will be a 1D array of shape `(input_dim,)`.

##### Usage
```python
import torch
from nn4n.mask import MultiArea

params = {
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
}
multiarea = MultiArea(**params)
multiarea.get_input_idx()
```

Output
```
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
       17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
       34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
       51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
       68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84,
       85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99])
```


# mask.get_non_input_idx( )
##### Description

Get the indices of the neurons that receive inputs.

##### Returns
> `non_input_idx`: (np.ndarray) The indices of neurons that don't receive inputs.

##### Usage
The example below will create a `MultiArea` object with 3 areas, where the first area is the input area. The `get_non_input_idx()` method will return indices of neurons in area 2 and 3, as they don't receive inputs.

```python
import torch
from nn4n.mask import MultiArea

params = {
    "n_areas": 3,
    "area_connectivities": [0.1, 0.1],
    "hidden_size": 90,
    "input_dim": 1,
    "output_dim": 1,
    "input_areas": [0],
    "readout_areas": [2],
}
multiarea = MultiArea(**params)
multiarea.get_non_input_idx()
```

Output
```
array([30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
       47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
       64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
       81, 82, 83, 84, 85, 86, 87, 88, 89])
```


# mask.get_areas( )
##### Description
Retrieve the area names

##### Returns
> `area_names`: (list) A list of area names.

##### Usage
```python
import torch
from nn4n.mask import MultiArea

params = {
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
}
multiarea = MultiArea(**params)
multiarea.get_areas()
```

Output
```
['area_1', 'area_2']
```


# mask.get_area_idx( )
##### Description
Get the node indices of a specific area.

##### Parameters
> `area`: (str) or (int), required. The name of the area or the index of the area.

##### Returns
> `indices`: (np.ndarray) The indices of the nodes in the specified area.

##### Usage
```python
import torch
from nn4n.mask import MultiArea

params = {
    "hidden_size": 100,
    "input_dim": 2,
    "output_dim": 2,
}
multiarea = MultiArea(**params)
multiarea.get_areas()  # ['area_1', 'area_2']
multiarea.get_area_idx('area_1')
```

Output
```
array([ 0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16,
       17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
       34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49])
```
