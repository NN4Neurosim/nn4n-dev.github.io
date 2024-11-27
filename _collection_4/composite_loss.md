---
title: 'criterion.CompositeLoss'
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

## Overview
The `CompositeLoss` module is designed to combine multiple loss functions into a single unified loss for training complex models. It allows flexibility in specifying different loss functions, their parameters, and associated weights, enabling users to tailor the overall loss function to specific training requirements.

---

## Parameters

- **`loss_cfg`** *(dict)*:  
  A dictionary specifying the configuration for each loss function.  
  Each key is a unique identifier for a loss (e.g., `'loss_fr_1'`), and the value is a dictionary with:
  - **`type`** *(str)*:  
    The type of loss function. Supported values:
      - `"fr"`: FiringRateLoss
      - `"fr_dist"`: FiringRateDistLoss
      - `"rnn_conn"`: RNNConnectivityLoss
      - `"state_pred"`: StatePredictionLoss
      - `"entropy"`: EntropyLoss
      - `"mse"`: Mean Squared Error Loss
      - `"hebbian"`: HebbianLoss
  - **`params`** *(dict, optional)*:  
    Parameters specific to the selected loss type. (Not required for `"mse"`)
  - **`lambda`** *(float, optional, default: `1.0`)*:  
    Weight for the contribution of this loss to the total loss.

**Example:**
```python
loss_cfg = {
    'loss_fr_1': {'type': 'fr', 'params': {'metric': 'l2'}, 'lambda': 1.0},
    'loss_mse': {'type': 'mse', 'lambda': 0.5}
}
```

---

## Methods

### `forward(loss_input_dict)`
Computes the total weighted loss by aggregating all configured loss components.

**Parameters:**
- **`loss_input_dict`** *(dict)*:  
  A dictionary where keys match the initialized loss identifiers (from `loss_cfg`), and values are dictionaries containing the inputs required for the respective loss functions.  
  - For `"mse"`, the dictionary must contain:
    - `"input"`: Predictions from the model.
    - `"target"`: Ground truth values.
  - For other loss types, the dictionary should contain the required arguments for the specific loss.

**Returns:**  
- **`total_loss`** *(torch.Tensor)*:  
  The total weighted loss value.
- **`loss_dict`** *(dict)*:  
  A dictionary with individual weighted loss values for each component.

**Raises:**  
- `KeyError`: If inputs for a configured loss are missing in `loss_input_dict`.

**Usage:**
```python
# Example loss input dictionary
loss_input_dict = {
    'loss_fr_1': {'states': torch.tensor(...)},
    'loss_mse': {'input': torch.tensor(...), 'target': torch.tensor(...)}
}

total_loss, loss_dict = composite_loss.forward(loss_input_dict)
```

---

## Features

1. **Custom Loss Components:**  
   Easily integrate custom loss types (e.g., `fr`, `fr_dist`, `hebbian`).
   
2. **Weighted Aggregation:**  
   Apply weights (`lambda`) to control the contribution of each loss component.

3. **Flexible Input Management:**  
   Pass specific inputs for each loss function during training.

4. **Error Handling:**  
   Ensures all required inputs are provided and validates loss configurations.

---

## Example

```python
import torch
from composite_loss import CompositeLoss

# Configuration for loss functions
loss_cfg = {
    'loss_fr_1': {'type': 'fr', 'params': {'metric': 'l2'}, 'lambda': 1.0},
    'loss_mse': {'type': 'mse', 'lambda': 0.5}
}

# Initialize CompositeLoss
composite_loss = CompositeLoss(loss_cfg)

# Input dictionary
loss_input_dict = {
    'loss_fr_1': {'states': torch.rand(10, 100)},
    'loss_mse': {'input': torch.rand(10, 1), 'target': torch.rand(10, 1)}
}

# Compute loss
total_loss, loss_dict = composite_loss.forward(loss_input_dict)

print(f"Total Loss: {total_loss}")
print(f"Loss Components: {loss_dict}")
```