---
title: mask.BaseMask
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

## Description
Base class for all masks. It serves as a boilerplate for other masks. It is not meant to be used directly.

## Parameters

- **`dims`** *(list, default: `[1, 100, 1]`)*:  
  A list specifying the dimensions of the network in the order `[input_dim, hidden_size, readout_dim]`.

- **`hidden_size`** *(int)*:  
  Number of neurons in the hidden layer, extracted from `dims[1]`.

- **`input_dim`** *(int, default: `1`)*:  
  Dimensionality of the input, extracted from `dims[0]`.

- **`readout_dim`** *(int, default: `1`)*:  
  Dimensionality of the output, extracted from `dims[2]`.

## Methods

### `get_input_indices()`
Abstract method to return the indices of neurons that receive input.  
Must be implemented in a child class.

**Raises:**  
`NotImplementedError` if called directly.

---

### `get_non_input_indices()`
Abstract method to return the indices of neurons that do not receive input.  
Must be implemented in a child class.

**Raises:**  
`NotImplementedError` if called directly.

---

### `get_readout_indices()`
Abstract method to return the indices of neurons that send readout.  
Must be implemented in a child class.

**Raises:**  
`NotImplementedError` if called directly.

---

### `get_areas()`
Abstract method to return the number of areas in the network.  
Must be implemented in a child class.

**Raises:**  
`NotImplementedError` if called directly.

---

### `get_area_indices(area)`
Abstract method to return the indices of neurons in a specific area.  
Must be implemented in a child class.

**Parameters:**
- `area` *(int)*: The area identifier.

**Raises:**  
`NotImplementedError` if called directly.

---

### `_generate_sparse_matrix(n, m, p)`
Generates a sparse binary matrix of size `(n, m)` with density `p`.  
A value of `1` indicates a connection, while `0` indicates no connection.

**Parameters:**
- `n` *(int)*: Number of rows.
- `m` *(int)*: Number of columns.
- `p` *(float)*: Probability of a connection, must be in `[0, 1]`.

**Returns:**  
- `mask` *(np.ndarray)*: Sparse binary matrix of shape `(n, m)`.

**Usage:**  
```python
sparse_matrix = mask._generate_sparse_matrix(10, 20, 0.1)
```

---

### `plot_masks()`
Plots the connectivity masks for:
- Input layer
- Hidden layer
- Readout layer

**Usage:**  
```python
mask.plot_masks()
```

---

### `get_masks()`
Returns the transposed connectivity masks for:
- Input layer
- Hidden layer
- Readout layer

**Assertions:**  
- The masks must already be generated.

**Returns:**  
- `List[np.ndarray]`: A list of transposed masks for the input, hidden, and readout layers.

**Usage:**  
```python
input_mask, hidden_mask, readout_mask = mask.get_masks()
```

---

### `get_specs()`
Returns a dictionary containing the specifications of the mask.

**Returns:**  
- `dict`: Specifications including:
  - `"dims"`
  - `"hidden_size"`
  - `"input_dim"`
  - `"readout_dim"`

**Usage:**  
```python
specs = mask.get_specs()
```

---

### `print_specs()`
Prints the specifications of the mask in a formatted manner.

**Usage:**  
```python
mask.print_specs()
```