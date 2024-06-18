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

$$ \mathcal{L}_{fr} = \frac{\lambda_{fr}}{N_{batch} T N_{hid}} \sum_{b,t,n=0}^{N_{batch}, T, N_{hid}} fr_{btn}^2 $$

where $N_{batch}$ is the batch size, $T$ is the number of time steps, $N_{out}$ is the number of output neurons, $fr_{btn}$ is the firing rate of neuron $n$ at time $t$ in the $i$-th batch.


# Firing Rate Constraint (SD)
**Lambda Key:** `lambda_fr_sd`

Regularize the SD of the HiddenLayer firing rates such that all neurons will fire at approximately the same rate. The Firing rate SD loss function is defined as:

$$ \mathcal{L}_{fr\_sd} = \lambda_{fr\_sd} \sqrt{\frac{1}{N_{hid}} \sum_{n=0}^{N_{hid}} \left(\sum_{b,t=0}^{N_{batch}, T}\frac{fr_{bt}}{N_{batch} T} - \mu \right)^2} $$

$$ \mu = \frac{\lambda_{fr}}{N_{batch} T N_{hid}} \sum_{b,t,n=0}^{N_{batch}, T, N_{hid}} fr_{btn} $$

where $N_{batch}$ is the batch size, $T$ is the number of time steps, $ y_{bt} $ is the predicted firing rate of the neuron at time $t$ in the $i$-th batch, and $f_{bt}$ is the ground truth firing rate of the neuron at time $t$ in the $i$-th batch.

# Firing Rate Constraint (CV)
**Lambda Key:** `lambda_fr_cv`

Regularize the firing rate of a single neuron such that all neurons will fire at approximately the same rate. The Firing Rate Regularization loss function is defined as:

$$ \mathcal{L}_{fr\_cv} = \lambda_{fr\_cv} \frac{\sigma}{\mu} $$

where $\sigma$ is the standard deviation of the firing rate of the neuron, and $\mu$ is the network mean firing rate.