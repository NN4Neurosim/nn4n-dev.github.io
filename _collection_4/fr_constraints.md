---
title: Firing Rate Constraint
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 6
---

# Firing Rate Constraint

**Lambda Key:** `lambda_fr`

Firing rate loss function. The Firing rate loss function is defined as:

$$ \mathcal{L}_{fr} = \frac{\lambda_{fr}}{B \times T \times N_{hid}} \sum_{b,t,i=0}^{B, T, N_{hid}} r_{b,t,i}^2 $$

- $ B $: number of batches.
- $ T $: number of time steps.
- $ N_{hid} $: number of hidden neurons.
- $ r_{b,t,i} $: firing rate of the $i$-th neuron at time $t$ in the $b$-th batch.


# Firing Rate Constraint (SD)
**Lambda Key:** `lambda_fr_sd`

Regularize the standard deviation of the firing rate.

$$ \mathcal{L}_{fr\_sd} = \lambda_{fr\_sd} \sqrt{\frac{1}{N_{hid}} \sum_{n=0}^{N_{hid}} \left(\frac{1}{B \times T} \sum_{b,t=0}^{B,T} r_{b,t} - \mu \right)^2} $$

$$ \mu = \frac{1}{B \times T \times N_{hid}} \sum_{b,t,i=0}^{B, T, N_{hid}} r_{b,t,i} $$

- $ B $: number of batches.
- $ T $: number of time steps.
- $ N_{hid} $: number of hidden neurons.
- $ r_{b,t,i} $: firing rate of the $i$-th neuron at time $t$ in the $b$-th batch.
- $ \mu $: mean firing rate.

# Firing Rate Constraint (CV)
**Lambda Key:** `lambda_fr_cv`

Regularize the coefficient of variation of the firing rate.

$$ \mathcal{L}_{fr\_cv} = \lambda_{fr\_cv} \frac{\sigma}{\mu} $$

- $ \sigma $: standard deviation of the firing rate of the neuron.
- $ \mu $: network mean firing rate.
