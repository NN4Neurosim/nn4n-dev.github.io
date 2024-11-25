---
title: MultiIO
author: Zhaoze Wang
date: 2024-11-08
category: docs
layout: post
order: 6
---


## Description

This is to support the senario when we need to project different inputs to different areas and readout from different areas. This will generate a multi-area RNN. This class primarily serves to generate the input and readout masks.

## Parameters


### Other Parameters

<div class="table-wrapper" markdown="block">

| Parameter | Default | Type | Description |
|:---------------------:|:-------------:|:------------------:|:-------------------------------------------:|
| dims                | [1, 100, 1]  | `list`            | Dimensions of input, hidden, and readout layers. |
| input_dims          | dims[1]          | `list`            | A list of dimensions of each group of input signals. The `input_dims` must sum-up to `dims[0]`. For example, if `dims[0]` is 100 (the input_dim), and you have two groups of input signals, one is 10-dim and the other is 90-dim, then `input_dims` should be [10, 90]. The sequence of the dims should correspond to the sequence of how the input signals are concatenated. For the previous case, the input tensor should be of shape (batch_size, n_timesteps, 100) and the first 10 dims are the first group of input signals, and the next 90 dims are the second group of input signals. |
| readout_dims         | dims[1]          | `list`            | A list of dimensions of each group of readout signals. The `readout_dims` must sum-up to `dims[2]`. For example, if `dims[2]` is 100 (the readout_dim), and you have two groups of readout signals, one is 10-dim and the other is 90-dim, then `readout_dims` should be [10, 90]. |
| input_table         | `np.ones((len(input_dims), dims[1]))`           | `np.ndarray`      | A table denoting whether an input signal will be projected to a given hidden layer node. Must be of a table of shape (n_input_groups, hidden_size) and containing only 0s or 1s. `n_input_groups` is the number of input groups (length of `input_dims`). A simple way to generate this table is that for each generate `n_input_groups` rows of vectors. Each vector has `hidden_size` elements containing only 0s or 1s. The $i$-th row of the table denotes the projection of the $i$-th input group to the hidden layer. |
| readout_table        | `np.ones((len(readout_dims), dims[1]))`           | `np.ndarray`      | This follows the same logic as `input_table`. A table denoting whether a hidden layer node will be used to generate a specific readout. Must be of a table of shape (n_readout_groups, hidden_size) and containing only 0s or 1s. `n_readout_groups` is the number of readout groups (length of `readout_dims`). |

</div>

<div class="table-wrapper" markdown="block">

| Attributes               | Type                       | Description                                |	
|:-------------------------|:--------------------------:|:-------------------------------------------|
| dims                     | `list`                     | Dimensions of input, hidden, and readout layers. |
| hidden_size              | `int`                      | Number of nodes in the HiddenLayer         |
| input_dim                | `int`                      | Input dimension                            |
| readout_dim               | `int`                      | readout dimension                           |
| input_dims               | `list`                     | A list of dimensions of each group of input signals. |
| readout_dims              | `list`                     | A list of dimensions of each group of readout signals. |
| input_table              | `np.ndarray`                | A table denoting whether an input signal will be projected to a given hidden layer node. |
| readout_table             | `np.ndarray`                | A table denoting whether a hidden layer node will be used to generate a specific readout. |

</div>


## Example

```python
import numpy as np
from nn4n.mask import MultiIO

input_table = np.ones((2, 200))
readout_table = np.ones((2, 200))
input_table[0, 0:100] = 0
input_table[1, 100:150] = 0
readout_table[0, 100:200] = 0

mask_params = {
    "dims": [20, 200, 10],
    "input_dims": [5, 15],
    "readout_dims": [5, 5],
    "input_table": input_table,
    "readout_table": readout_table,
}

mask = MultiIO(**mask_params)
mask.print_specs()
mask.plot_masks()
```

###### Output:
<p>
<img src="{{ '/assets/images/mask/results/multi_io_input_mask.png' | relative_url }}" width="480">
</p>
This mask does not change the hidden layer connectivity. Skipped.
<p>
<img src="{{ '/assets/images/mask/results/multi_io_readout_mask.png' | relative_url }}" width="480">
</p>
```bash
MultiIO Specs: 
   | dims:               [20, 200, 10]
   | hidden_size:        200
   | input_dim:          20
   | readout_dim:         10
   | input_dims:         [5, 15]
   | readout_dims:        [5, 5]
   | input_table_shape:  (2, 200)
   | readout_table_shape: (2, 200)
```
