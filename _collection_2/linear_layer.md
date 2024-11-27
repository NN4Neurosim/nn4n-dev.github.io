---
title: 'layer.LinearLayer'
author: Zhaoze Wang
date: 2024-11-25
category: docs
layout: post
order: 1
---

## Parameters

- **`input_dim`** *(int)*:  
  The dimensionality of the input to the layer.

- **`output_dim`** *(int)*:  
  The dimensionality of the output from the layer.

- **`weight`** *(str, default: `"uniform"`)*:  
  Initialization method for the weight matrix.  
  - Options: 
    - `"uniform"`: Random values uniformly distributed.
    - `"normal"`: Random values normally distributed.
    - `"zero"`: All values initialized to zero.
    - Custom: A predefined `numpy.ndarray` can also be passed.

- **`bias`** *(str, default: `"uniform"`)*:  
  Initialization method for the bias vector.  
  - Options: 
    - `"uniform"`: Random values uniformly distributed.
    - `"normal"`: Random values normally distributed.
    - `"zero"`: All values initialized to zero.
    - Custom: A predefined `numpy.ndarray` can also be passed.

- **`ei_mask`** *(torch.Tensor, optional, default: `None`)*:  
  A mask for enforcing Dale's law. Positive values enforce excitatory constraints, while negative values enforce inhibitory constraints.

- **`sparsity_mask`** *(torch.Tensor, optional, default: `None`)*:  
  A mask defining sparse connectivity in the weight matrix. Values >0 indicate active connections.

- **`plasticity_mask`** *(torch.Tensor, optional, default: `None`)*:  
  A mask controlling plasticity in the network. Each value corresponds to the scale of plasticity applied during gradient updates.

## Methods

### `from_dict(cls, layer_struct)`
Creates a `LinearLayer` instance from a dictionary of parameters.

**Parameters:**
- `layer_struct` *(dict)*:  
  A dictionary containing the following keys:
  - `"input_dim"` (required)
  - `"output_dim"` (required)
  - `"weight"` (optional)
  - `"bias"` (optional)
  - `"ei_mask"` (optional)
  - `"sparsity_mask"` (optional)
  - `"plasticity_mask"` (optional)

**Usage:**  
```python
layer = LinearLayer.from_dict(layer_struct)
```

---

### `auto_rescale(param_type)`
Rescales the weights or biases, particularly useful for sparse layers.

**Parameters:**
- `param_type` *(str)*:  
  Specifies which parameter to rescale.  
  - Options: `"weight"` or `"bias"`

**Usage:**  
```python
layer.auto_rescale("weight")
```

---

### `to(device)`
Moves the layer to a specified device (CPU or GPU).

**Parameters:**
- `device` *(torch.device)*:  
  Target device (e.g., `torch.device("cuda")` or `"cpu"`).

**Usage:**  
```python
layer.to(torch.device("cuda"))
```

---

### `forward(x)`
Performs a forward pass through the layer.

**Parameters:**
- `x` *(torch.Tensor)*:  
  Input tensor of shape `(batch_size, input_dim)`.

**Returns:**  
A tensor of shape `(batch_size, output_dim)`.

**Usage:**  
```python
output = layer.forward(input_tensor)
```

---

### `apply_plasticity()`
Applies the plasticity mask to the gradient of the weight matrix during training.

**Usage:**  
```python
layer.apply_plasticity()
```

---

### `freeze()`
Freezes the layer by disabling gradient updates for both weights and biases.

**Usage:**  
```python
layer.freeze()
```

---

### `unfreeze()`
Unfreezes the layer, allowing gradient updates for weights and biases.

**Usage:**  
```python
layer.unfreeze()
```

---

### `enforce_constraints()`
Enforces the specified constraints, such as sparsity and Dale's law.

**Usage:**  
```python
layer.enforce_constraints()
```

---

### `set_weight(weight)`
Sets the weight matrix for the layer.

**Parameters:**
- `weight` *(torch.Tensor)*:  
  A tensor with the same shape as the layer's weight matrix.

**Usage:**  
```python
layer.set_weight(new_weight_tensor)
```

---

### `plot_layer(plot_type="weight")`
Plots the layer's weight matrix or its distribution.

**Parameters:**
- `plot_type` *(str, default: `"weight"`)*:  
  Type of plot.  
  - Options:
    - `"weight"`: Plots the weight matrix.
    - `"dist"`: Plots the weight distribution.

**Usage:**  
```python
layer.plot_layer("dist")
```

---

### `get_specs()`
Retrieves the specifications and statistics of the layer.

**Returns:**  
A dictionary containing:
- `"input_dim"`, `"output_dim"`, `"weight_learnable"`, `"bias_learnable"`, min/max values for weights and biases, and sparsity information.

**Usage:**  
```python
specs = layer.get_specs()
```