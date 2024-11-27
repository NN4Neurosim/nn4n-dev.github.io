---
title: 'criterion.RNNLoss'
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 3
---


# RNNLoss

This document provides a detailed description of the `RNNLoss` module, its functionality, and the mathematical formulation for each loss component.

---

## Overview

The `RNNLoss` module computes a composite loss for a `CTRNN` model. It includes various loss components to constrain the model's behavior and promote specific properties like sparsity, firing rate regularization, and output accuracy.

**Key Features:**
- Modular loss components, each associated with a lambda weight.
- Loss functions for sparsity in input, hidden, and readout layers.
- Firing rate regularization with multiple metrics (mean, standard deviation, coefficient of variation).
- Mean Squared Error (MSE) for output predictions.

---

## Parameters

- **`model`** *(CTRNN)*:  
  The recurrent neural network model for which the loss is computed. Must be an instance of `CTRNN`.

- **Keyword Arguments:**  
  Coefficients for individual loss components:
  - **`lambda_mse`** *(float, default: `1`)*:  
    Weight for the Mean Squared Error loss.
  - **`lambda_in`** *(float, default: `0`)*:  
    Weight for the sparsity loss of the input layer.
  - **`lambda_hid`** *(float, default: `0`)*:  
    Weight for the sparsity loss of the hidden layer.
  - **`lambda_out`** *(float, default: `0`)*:  
    Weight for the sparsity loss of the readout layer.
  - **`lambda_fr`** *(float, default: `0`)*:  
    Weight for the firing rate loss.
  - **`lambda_fr_sd`** *(float, default: `0`)*:  
    Weight for the standard deviation of firing rates.
  - **`lambda_fr_cv`** *(float, default: `0`)*:  
    Weight for the coefficient of variation of firing rates.

---

## Loss Components

### InputLayer Sparsity
**Lambda Key:** `lambda_in`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{in}} = \frac{\lambda_{\text{in}}}{N_{\text{in}} N_{\text{hid}}} ||\mathbf{W}_{\text{in}}||_F^2
$$

- $ N_{\text{in}} $: Number of input neurons.  
- $ N_{\text{hid}} $: Number of hidden neurons.  
- $ \mathbf{W}_{\text{in}} $: Weight matrix of the input layer.  

---

### HiddenLayer Sparsity
**Lambda Key:** `lambda_hid`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{hid}} = \frac{\lambda_{\text{hid}}}{N_{\text{hid}}^2} ||\mathbf{W}_{\text{hid}}||_F^2
$$

- $ N_{\text{hid}} $: Number of hidden neurons.  
- $ \mathbf{W}_{\text{hid}} $: Weight matrix of the hidden layer.  

---

### ReadoutLayer Sparsity
**Lambda Key:** `lambda_out`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{out}} = \frac{\lambda_{\text{out}}}{N_{\text{out}} N_{\text{hid}}} ||\mathbf{W}_{\text{out}}||_F^2
$$

- $ N_{\text{out}} $: Number of readout neurons.  
- $ N_{\text{hid}} $: Number of hidden neurons.  
- $ \mathbf{W}_{\text{out}} $: Weight matrix of the readout layer.  

---

### Firing Rate
**Lambda Key:** `lambda_fr`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{fr}} = \frac{\lambda_{\text{fr}}}{B \cdot T \cdot N_{\text{hid}}} \sum_{b,t,i=1}^{B,T,N_{\text{hid}}} r_{b,t,i}^2
$$

- $ B $: Number of batches.  
- $ T $: Number of time steps.  
- $ N_{\text{hid}} $: Number of hidden neurons.  
- $ r_{b,t,i} $: Firing rate of the $ i $-th neuron at time $ t $ in the $ b $-th batch.  

---

### Firing Rate Standard Deviation (SD)
**Lambda Key:** `lambda_fr_sd`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{fr\_sd}} = \lambda_{\text{fr\_sd}} \sqrt{\frac{1}{N_{\text{hid}}} \sum_{i=1}^{N_{\text{hid}}} \left( \bar{r}_i - \mu \right)^2}
$$


$$
\mu = \frac{1}{B \cdot T \cdot N_{\text{hid}}} \sum_{b,t,i=1}^{B,T,N_{\text{hid}}} r_{b,t,i}
$$

- $ \bar{r}_i $: Mean firing rate of neuron $ i $.  
- $ \mu $: Overall mean firing rate.  

---

### Firing Rate Coefficient of Variation (CV)
**Lambda Key:** `lambda_fr_cv`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{fr\_cv}} = \lambda_{\text{fr\_cv}} \frac{\sigma}{\mu}
$$

- $ \sigma $: Standard deviation of firing rates across neurons.  
- $ \mu $: Mean firing rate of the network.  

---

### Mean Squared Error (MSE)
**Lambda Key:** `lambda_mse`

**Mathematical Formulation:**

$$
\mathcal{L}_{\text{mse}} = \frac{\lambda_{\text{mse}}}{B \cdot T \cdot N_{\text{out}}} \sum_{b,t,k=1}^{B,T,N_{\text{out}}} \left( \hat{y}_{b,t,k} - y_{b,t,k} \right)^2
$$

- $ B $: Number of batches.  
- $ T $: Number of time steps.  
- $ N_{\text{out}} $: Dimension of the outputs.  
- $ \hat{y}_{b,t,k} $: Predicted output.  
- $ y_{b,t,k} $: Ground truth output.  

---

## Methods

### `forward(pred, label, **kwargs)`
Computes the total loss and individual component losses.

**Parameters:**
- **`pred`** *(torch.Tensor)*: Predicted outputs of shape $(-1, B, 2)$.  
- **`label`** *(torch.Tensor)*: Ground truth labels of shape $(-1, B, 2)$.  
- **`kwargs`** *(dict)*: Additional inputs for specific loss components (e.g., states).  

**Returns:**  
- **`total_loss`** *(torch.Tensor)*: Sum of all weighted losses.  
- **`loss_components`** *(torch.Tensor)*: Individual loss components.  

**Usage:**  
```python
total_loss, losses = rnn_loss(pred=predicted_outputs, label=ground_truth, states=hidden_states)
```