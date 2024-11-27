---
title: mask.MultiAreaEI
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 4
---

## Description

This class is a child class of `MultiArea`. It will generate a multi-area RNN with E/I constraints. Therefore, by default, the input/hidden/readout masks are signed masks. Use cautious as it will change the sign of the weights. 

<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area_EI_Structure.png' | relative_url }}" width="500">
</p>

## Parameters

- **`exc_pct`** *(float, default: `0.8`)*:  
  The percentage of excitatory neurons within each area. Must be a value between 0 and 1.

- **`inter_area_connections`** *(list of 4 booleans, default: `[True, True, True, True]`)*:  
  Specifies whether to allow specific inter-area connections:
  1. `exc_exc`: Connections between excitatory neurons in different areas.
  2. `exc_inh`: Connections from excitatory neurons to inhibitory neurons in different areas.
  3. `inh_exc`: Connections from inhibitory neurons to excitatory neurons in different areas.
  4. `inh_inh`: Connections between inhibitory neurons in different areas.

- **`inh_readout`** *(bool, default: `True`)*:  
  Determines whether inhibitory neurons contribute to the readout layer.

## Methods

### `get_sparsity_masks()`
Returns sparsity masks as binary versions of the current masks, where:
- Values of 1 or -1 are replaced with 1.
- Values of 0 remain 0.

**Returns:**  
- `List[np.ndarray]`: Sparsity masks for the input, hidden, and readout layers.

**Usage:**  
```python
sparsity_masks = multi_area_ei.get_sparsity_masks()
```

---

### `get_specs()`
Returns the specifications of the multi-area network, including EI-specific parameters.

**Returns:**  
- `dict`: Specifications including:
  - `"dims"`
  - `"hidden_size"`
  - `"input_dim"`
  - `"readout_dim"`
  - `"n_areas"`
  - `"area_connectivities"`
  - `"input_areas"`
  - `"readout_areas"`
  - `"exc_pct"`
  - `"inter_area_connections"`
  - `"inh_readout"`

**Usage:**  
```python
specs = multi_area_ei.get_specs()
```

## Inter-Area Connections Under EI Constraints
Depending on the specific problem you are investigating on, it is possible that you want to eliminate inhibitory connections between areas. Or, you might not want excitatory neurons to connect to inhibitory neurons in other areas. See figure below for different cases of inter-area connections under EI constraints.

<p align="center"><img src="{{ '/assets/images/basics/Multi_Area_EI.png' | relative_url }}" width="600"></p>

To specify what kinds of inter-area connections you want to keep, simple pass a 4-element boolean list to `inter_area_connections`. The 4 elements denotes whether to keep inter-area 'exc-exc', 'exc-inh', 'inh-exc', and 'inh-inh' connections.

<br>