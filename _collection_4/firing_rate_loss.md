---
title: Constraints on Firing Rates
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 4
---

# Introduction

This document provides an overview of the custom loss functions implemented in the provided code. Each loss function includes its purpose, mathematical formulation (if applicable), and usage details.

---

## `criterion.FiringRateLoss`

**Description:**  
Computes the firing rate loss using either L1 or L2 norm on the mean firing rate across specified dimensions.

Mathematical Formulation:
Given neuron states $ S $ with shape $(B, T, N)$:  
- **L1 Loss**:  

  $$ \mathcal{L}_{\text{L1}} = \frac{1}{N} \sum_{i=1}^N \left| \mu_i \right| $$

- **L2 Loss**:  

  $$ \mathcal{L}_{\text{L2}} = \frac{1}{N} \sum_{i=1}^N \mu_i^2 $$
  
Where $ \mu_i = \frac{1}{BT} \sum_{b=1}^B \sum_{t=1}^T S_{b,t,i} $.

**Usage:**  
```python
loss = FiringRateLoss(metric="l2")
output = loss(states=torch.tensor(...))
```

---

## `criterion.FiringRateDistLoss`

**Description:**  
Measures the distribution properties (e.g., standard deviation, coefficient of variation) of firing rates.

**Metrics:**  
- **Standard Deviation (SD):**  
  
  $$
  \mathcal{L}_{\text{SD}} = \sqrt{\frac{1}{N} \sum_{i=1}^N (\mu_i - \bar{\mu})^2}
  $$

- **Coefficient of Variation (CV):**  

  $$
  \mathcal{L}_{\text{CV}} = \frac{\sigma}{\bar{\mu}}
  $$

- **Mean Absolute Deviation (MAD):**  

  $$
  \mathcal{L}_{\text{MAD}} = \frac{1}{N} \sum_{i=1}^N \left| \mu_i - \bar{\mu} \right|
  $$

- **Maximum Absolute Deviation (MaxAD):**  

  $$
  \mathcal{L}_{\text{MaxAD}} = \max_{i} \left| \mu_i - \bar{\mu} \right|
  $$

Where $ \mu_i = \frac{1}{BT} \sum_{b=1}^B \sum_{t=1}^T S_{b,t,i} $ and $ \bar{\mu} $ is the mean firing rate.

**Usage:**  
```python
loss = FiringRateDistLoss(metric="sd")
output = loss(states=torch.tensor(...))
```

---

## `criterion.StatePredictionLoss`

**Description:**  
Measures the ability of the network to predict future states. Compares states with a lag of $ \tau $.

**Mathematical Formulation:**  

$$
\mathcal{L} = \frac{1}{(T-\tau)N} \sum_{t=1}^{T-\tau} \sum_{i=1}^N \left( S_{t,i} - S_{t+\tau,i} \right)^2
$$

**Usage:**  
```python
loss = StatePredictionLoss(tau=1)
output = loss(states=torch.tensor(...))
```

---

## `criterion.HebbianLoss`

**Description:**  
Computes a loss based on Hebbian learning principles by measuring the correlation of neuron states weighted by synaptic strengths.

**Mathematical Formulation:**  

$$
\mathcal{L} = \frac{1}{B} \sum_{b=1}^B \left| \sum_{i,j} W_{i,j} \cdot \text{Corr}(S_i, S_j) \right|
$$

Where $ \text{Corr}(S_i, S_j) = \frac{1}{T} \sum_{t=1}^T S_{t,i} S_{t,j} $ and $ W_{i,j} $ are the synaptic weights.

**Usage:**  
```python
loss = HebbianLoss()
output = loss(states=torch.tensor(...), weights=torch.tensor(...))
```

---

## `criterion.EntropyLoss`

**Description:**  
Measures the entropy of neuron activations normalized as probabilities and adds a regularization term based on the L2 norm of the activations.

**Mathematical Formulation:**  

$$
\mathcal{L} = -\frac{1}{BT} \sum_{b=1}^B \sum_{t=1}^T \sum_{i=1}^N p_{b,t,i} \log(p_{b,t,i}) + \lambda \cdot \frac{1}{BT} \sum_{b=1}^B \sum_{t=1}^T \|S_{b,t}\|^2
$$

Where $ p_{b,t,i} = \frac{S_{b,t,i}}{\sum_{j=1}^N S_{b,t,j}} $ is the normalized probability.

**Usage:**  
```python
loss = EntropyLoss(reg=1e1)
output = loss(states=torch.tensor(...))
```

---

## `criterion.PopulationKL`

**Description:**  
Computes the Kullback-Leibler (KL) divergence between the distributions of two neuronal populations. Optionally computes the symmetric KL divergence.

**Mathematical Formulation:**  
For population states $ S_0 $ and $ S_1 $:  
- KL Divergence:  

  $$
  D_{\text{KL}}(P || Q) = \frac{1}{2} \sum_i \left( \log\left(\frac{\sigma_{Q,i}}{\sigma_{P,i}}\right) + \frac{\sigma_{P,i}^2 + (\mu_{P,i} - \mu_{Q,i})^2}{\sigma_{Q,i}^2} - 1 \right)
  $$

- Symmetric KL Divergence:  

  $$
  D_{\text{sym}} = \frac{1}{2} \left( D_{\text{KL}}(P || Q) + D_{\text{KL}}(Q || P) \right)
  $$

**Usage:**  
```python
loss = PopulationKL(symmetric=True, reg=1e-3, reduction="mean")
output = loss(states_0=torch.tensor(...), states_1=torch.tensor(...))
```