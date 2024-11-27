---
title: 'model.CTRNN'
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 1
---


## Parameters

- **`dims`** *(list, default: `[1, 100, 1]`)*:  
  The dimensions of the network in the format `[input_dim, hidden_size, output_dim]`.

- **`preact_noise`** *(float, default: `0`)*:  
  Standard deviation of Gaussian noise added to the pre-activation state.

- **`postact_noise`** *(float, default: `0`)*:  
  Standard deviation of Gaussian noise added to the post-activation state.

- **`activation`** *(str, default: `"relu"`)*:  
  Activation function for the recurrent layer. Options: `"relu"`, `"sigmoid"`, `"tanh"`, `"retanh"`.

- **`dt`** *(float, default: `10`)*:  
  Time step size.

- **`tau`** *(float, default: `100`)*:  
  Time constant for the recurrent dynamics.

- **`biases`** *(list or single value, default: `None`)*:  
  Specifies bias initialization for each layer.  
  - Options for each layer: `"zero"`, `"normal"`, `"uniform"`, or `None`.  
  - Can also directly pass a `numpy.ndarray` or `torch.Tensor`.

- **`weights`** *(list or single value, default: `"uniform"`)*:  
  Specifies weight initialization for each layer.  
  - Options for each layer: `"normal"`, `"uniform"`, or directly pass `numpy.ndarray` or `torch.Tensor`.

- **`sparsity_masks`** *(list or `None`, default: `None`)*:  
  Masks defining sparsity for each layer.  
  - Each value can be `None` or a `numpy.ndarray`/`torch.Tensor`.

- **`ei_masks`** *(list or `None`, default: `None`)*:  
  Masks enforcing Dale's law (excitatory/inhibitory constraints) for each layer.  
  - Each value can be `None` or a `numpy.ndarray`/`torch.Tensor`.

- **`plasticity_masks`** *(list or `None`, default: `None`)*:  
  Masks controlling plasticity for each layer.  
  - Each value can be `None` or a `numpy.ndarray`/`torch.Tensor`.

- **`synapse_growth_masks`** *(list or `None`, default: `None`)*:  
  Masks controlling synapse growth probability.  
  - Each value can be `None` or a `numpy.ndarray`/`torch.Tensor`.

## Methods

### `to(device)`
Moves the network and its layers to the specified device (CPU or GPU).

**Parameters:**
- `device` *(torch.device)*:  
  Target device (e.g., `torch.device("cuda")` or `"cpu"`).

**Usage:**  
```python
ctrnn.to(torch.device("cuda"))
```

---

### `forward(x, init_state=None)`
Performs a forward pass through the network.

**Parameters:**
- `x` *(torch.Tensor)*:  
  Input tensor of shape `(batch_size, n_timesteps, input_dim)`.
- `init_state` *(torch.Tensor, optional, default: `None`)*:  
  Initial state of the recurrent layer.

**Returns:**  
- `output` *(torch.Tensor)*:  
  Output tensor of the network.
- `hidden_states` *(dict)*:  
  Dictionary containing hidden states.

**Usage:**  
```python
output, states = ctrnn.forward(input_tensor, init_state)
```

---

### `train()`
Sets the network to training mode.  
Restores pre-activation and post-activation noise values and resumes enforcing constraints.

**Usage:**  
```python
ctrnn.train()
```

---

### `eval()`
Sets the network to evaluation mode.  
Disables pre-activation and post-activation noise and pauses enforcing constraints.

**Usage:**  
```python
ctrnn.eval()
```

---

### `apply_plasticity()`
Applies plasticity masks to the weight gradients of the network's layers.

**Usage:**  
```python
ctrnn.apply_plasticity()
```

---

### `print_layer()`
Prints the specifications of each layer in the network.

**Usage:**  
```python
ctrnn.print_layer()
```

---

### `plot_layers()`
Plots the weight matrices and distributions of each layer in the network.

**Usage:**  
```python
ctrnn.plot_layers()
```
