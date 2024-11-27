---
title: 'layer.HiddenLayer'
author: Zhaoze Wang
date: 2024-11-25
category: docs
layout: post
order: 2
---

## Parameters

- **`linear_layer`** *(LinearLayer)*:  
  The main linear layer, such as $ \mathbf{W}^{rc} $ in an RNN.

- **`activation`** *(nn.Module)*:  
  Activation function applied to the output.

- **`input_layer`** *(LinearLayer, optional, default: `None`)*:  
  Input projection layer, such as $ \mathbf{W}^{in} $ in an RNN. If not provided, the input is directly added to the hidden state, equivalent to setting $ \mathbf{W}^{in} $ as an identity matrix.

- **`alpha`** *(float, default: `0.1`)*:  
  Controls the update rate of the hidden state.

- **`learn_alpha`** *(bool, default: `False`)*:  
  Determines whether `alpha` is a trainable parameter.

- **`preact_noise`** *(float, default: `0`)*:  
  Standard deviation of Gaussian noise added to the pre-activation state.

- **`postact_noise`** *(float, default: `0`)*:  
  Standard deviation of Gaussian noise added to the post-activation state.

## Methods

### `input_dim`
**Property**: Returns the input dimensionality of the layer. Equivalent to the `input_dim` of the `linear_layer`.

---

### `output_dim`
**Property**: Returns the output dimensionality of the layer. Equivalent to the `output_dim` of the `linear_layer`.

---

### `hidden_size`
**Property**: Returns the size of the hidden state. Equivalent to the `input_dim` of the `linear_layer`.

---

### `to(device)`
Moves the layer and its components (e.g., `linear_layer` and `alpha`) to the specified device (CPU or GPU).

**Parameters:**
- `device` *(torch.device)*:  
  Target device (e.g., `torch.device("cuda")` or `"cpu"`).

**Usage:**  
```python
layer.to(torch.device("cuda"))
```

---

### `forward(fr_hid_t, v_hid_t, u_in_t)`
Performs a forward pass to update the hidden states.

**Parameters:**
- `fr_hid_t` *(torch.Tensor)*:  
  Post-activation hidden state at the current time step, shape `(batch_size, hidden_size)`.

- `v_hid_t` *(torch.Tensor)*:  
  Pre-activation hidden state at the current time step, shape `(batch_size, hidden_size)`.

- `u_in_t` *(torch.Tensor)*:  
  Input at the current time step, shape `(batch_size, input_size)`.

**Returns:**  
- `fr_t_next` *(torch.Tensor)*:  
  Post-activation hidden state for the next time step, shape `(batch_size, hidden_size)`.

- `v_t_next` *(torch.Tensor)*:  
  Pre-activation hidden state for the next time step, shape `(batch_size, hidden_size)`.

**Usage:**  
```python
fr_t_next, v_t_next = layer.forward(fr_hid_t, v_hid_t, u_in_t)
```

---

### `enforce_constraints()`
Enforces constraints on the `linear_layer` and `input_layer` (if provided). Constraints include sparsity and Dale’s law.

**Usage:**  
```python
layer.enforce_constraints()
```

---

### `apply_plasticity()`
Applies plasticity masks to the weight gradients of the `linear_layer` and `input_layer` (if provided).

**Usage:**  
```python
layer.apply_plasticity()
```

---

### `train()`
Placeholder for preparing the layer for training. Typically used to adjust noise levels or similar parameters. (Not yet implemented.)

---

### `eval()`
Placeholder for preparing the layer for evaluation. Typically used to disable noise or similar parameters. (Not yet implemented.)

---

### `plot_layer(**kwargs)`
Plots the `linear_layer` and `input_layer` (if provided). Uses any keyword arguments passed to customize the plot.

**Usage:**  
```python
layer.plot_layer()
```