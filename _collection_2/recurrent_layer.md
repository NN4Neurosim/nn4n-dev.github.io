---
title: 'layer.RecurrentLayer'
author: Zhaoze Wang
date: 2024-11-25
category: docs
layout: post
order: 4
---

## Parameters

- **`layer_struct`** *(dict)*:  
  Dictionary containing the following keys:
  - **`activation`** *(str, default: `"relu"`)*:  
    The activation function used for the recurrent layer.
  - **`preact_noise`** *(float, default: `0`)*:  
    Standard deviation of Gaussian noise added to the pre-activation state.
  - **`postact_noise`** *(float, default: `0`)*:  
    Standard deviation of Gaussian noise added to the post-activation state.
  - **`dt`** *(float, default: `10`)*:  
    Time step size.
  - **`tau`** *(float, default: `100`)*:  
    Time constant for the recurrent dynamics.
  - **`in_struct`** *(dict)*:  
    Dictionary defining the input layer's configuration.
  - **`hid_struct`** *(dict)*:  
    Dictionary defining the hidden layer's configuration.

- **`kwargs`**:  
  Additional keyword arguments for layer configuration, such as noise settings.

## Methods

### `to(device)`
Moves the recurrent layer and its components (e.g., `input_layer`, `hidden_layer`) to the specified device (CPU or GPU).

**Parameters:**
- `device` *(torch.device)*:  
  Target device (e.g., `torch.device("cuda")` or `"cpu"`).

**Usage:**  
```python
layer.to(torch.device("cuda"))
```

---

### `forward(x, init_state=None)`
Performs a forward pass through the recurrent layer over a sequence of timesteps.

**Parameters:**
- `x` *(torch.Tensor)*:  
  Input tensor of shape `(batch_size, n_timesteps, input_dim)`.

- `init_state` *(torch.Tensor, optional, default: `None`)*:  
  Initial state of the hidden layer, shape `(batch_size, hidden_size)`. If `None`, it defaults to zeros.

**Returns:**  
- `stacked_states` *(torch.Tensor)*:  
  Hidden states of the network across all timesteps, shape `(batch_size, n_timesteps, hidden_size)`.

**Usage:**  
```python
output_states = layer.forward(input_tensor, initial_state)
```

---

### `apply_plasticity()`
Applies plasticity masks to the weight gradients of the input and hidden layers.

**Usage:**  
```python
layer.apply_plasticity()
```

---

### `enforce_constraints()`
Enforces constraints such as sparsity or excitatory/inhibitory balance in both the input and hidden layers.  
This is called automatically after each forward pass but can also be invoked manually.

**Usage:**  
```python
layer.enforce_constraints()
```

---

### `plot_layer(**kwargs)`
Plots the weight matrices and distributions of both the input and hidden layers. Accepts optional keyword arguments for customization.

**Usage:**  
```python
layer.plot_layer()
```

---

### `get_specs()`
Returns a dictionary of the layer’s specifications and statistics.

**Returns:**  
A dictionary containing:
- `"activation"`: The activation function used.
- `"preact_noise"`: Standard deviation of pre-activation noise.
- `"postact_noise"`: Standard deviation of post-activation noise.
- `"learn_alpha"`: Whether the `alpha` parameter is trainable.
- `"alpha_mean"`: Mean value of the `alpha` parameter.

**Usage:**  
```python
specs = layer.get_specs()
```
