---
title: 'layer.RNNLayer'
author: Zhaoze Wang
date: 2024-11-25
category: docs
layout: post
order: 3
---

## Parameters

- **`hidden_layers`** *(List[nn.Module])*:  
  A list of hidden layers forming the recurrent network. Each layer should be an instance of `nn.Module`.

- **`readout_layer`** *(LinearLayer, optional, default: `None`)*:  
  An optional readout layer to map the final hidden state to the output space.

- **`device`** *(str, default: `"cpu"`)*:  
  The device where the network and its components are initialized (`"cpu"` or `"cuda"`).

## Methods

### `to(device)`
Moves the entire recurrent layer, including its hidden and readout layers, to the specified device.

**Parameters:**
- `device` *(torch.device)*:  
  Target device (e.g., `torch.device("cuda")` or `"cpu"`).

**Usage:**  
```python
layer.to(torch.device("cuda"))
```

---

### `_generate_init_state(dim, batch_size, i_val=0)`
Generates an initial state tensor with a specified dimension, batch size, and initialization value.

**Parameters:**
- `dim` *(int)*:  
  Dimensionality of the hidden state.
- `batch_size` *(int)*:  
  Number of batches.
- `i_val` *(float, default: `0`)*:  
  Initialization value for the state.

**Returns:**  
- `torch.Tensor`: Initialized state tensor of shape `(batch_size, dim)`.

**Usage:**  
```python
init_state = layer._generate_init_state(hidden_size, batch_size)
```

---

### `forward(x, init_states=None)`
Performs a forward pass through the recurrent layer over a sequence of timesteps.

**Parameters:**
- `x` *(torch.Tensor)*:  
  Input tensor of shape `(batch_size, n_timesteps, input_dim)`.
- `init_states` *(List[torch.Tensor], optional, default: `None`)*:  
  A list of initial states for the hidden layers. Each element has shape `(batch_size, hidden_size)` for the corresponding hidden layer.

**Returns:**  
- `output` *(torch.Tensor or None)*:  
  Output tensor from the readout layer if it exists; otherwise, `None`.
- `hidden_states` *(List[torch.Tensor])*:  
  A list of tensors representing the hidden states across all timesteps for each hidden layer.

**Usage:**  
```python
output, hidden_states = layer.forward(input_tensor, initial_states)
```

---

### `train()`
Sets the layer to training mode by enabling pre-activation and post-activation noise in hidden layers and enforcing constraints.

**Usage:**  
```python
layer.train()
```

---

### `eval()`
Sets the layer to evaluation mode by disabling pre-activation and post-activation noise in hidden layers and pausing constraint enforcement.

**Usage:**  
```python
layer.eval()
```

---

### `apply_plasticity()`
Applies plasticity masks to the weight gradients of all hidden layers and the readout layer (if it exists).

**Usage:**  
```python
layer.apply_plasticity()
```

---

### `enforce_constraints()`
Enforces constraints, such as sparsity or excitatory/inhibitory balance, on all hidden layers and the readout layer (if it exists).  
This method is called automatically during training but can be invoked manually if needed.

**Usage:**  
```python
layer.enforce_constraints()
```

---

### `plot_layer(**kwargs)`
Plots the weight matrices and distributions of all hidden layers. Accepts additional keyword arguments for customization.

**Usage:**  
```python
layer.plot_layer()
```

---

### `print_layer()`
Placeholder for printing the weight matrices and distributions of all hidden layers. Not implemented.

**Usage:**  
```python
layer.print_layer()
```