---
title: Criterion Introduction
author: Zhaoze Wang
date: 2024-06-14
category: docs
layout: post
order: 1
---

## RNNLoss Introduction
The loss function is modularized. Each criterion is designed in the format of $\lambda \mathcal{L}$. By default, all $\lambda$ are set to 0 and won't be added to loss (nor the auto-grad tree). By changing the corresponding $\lambda$ to non-zero positive values, the corresponding loss function will be added to the total loss. The total loss is the sum of all loss functions with non-zero $\lambda$.

## RNNLoss Components
### MSE
**Lambda Key:** `'lambda_mse'`
#### Definition
Mean Squared Error (MSE) loss function. The MSE loss function is defined as:

$$ L_{MSE} = \frac{\lambda_{mse}}{N_{batch} T N_{out}} \sum_{b,t,n=0}^{N_{batch}, T, N_{out}} \left( \hat{y}_{btn} - y_{btn} \right)^2 $$

where $N$ is the number of samples, $\hat{y}_{btn}$ is the predicted value, and $y_{btn}$ is the ground truth value.

### InputLayer sparsity
**Lambda Key:**`'lambda_in'`
#### Definition
InputLayer sparsity loss function. The InputLayer sparsity loss function is defined as:

$$ L_{in} = \frac{\lambda_{in}}{N_{in} N_{hid}} \sum_{i,j} w_{ij}^2 = \frac{\lambda_{in}}{N_{in} N_{hid}} ||W_{in}||_F^2 $$

where $N_{in}$ is the number of input neurons, $N_{hid}$ is the size of the input, and $w_{ij}$ is the weight from the $i$-th input neuron to the $j$-th hidden neuron.

### HiddenLayer sparsity
**Lambda Key:**`'lambda_hid'`
#### Definition
HiddenLayer sparsity loss function. The HiddenLayer sparsity loss function is defined as:

$$ L_{hid} = \frac{\lambda_{hid}}{N_{hid} N_{hid}} \sum_{i,j} w_{ij}^2 = \frac{\lambda_{hid}}{N_{hid} N_{hid}} ||W_{hid}||_F^2 $$

where $N_{hid}$ is the number of hidden neurons, $N_{hid}$ is the size of the input (of the HiddenLayer), and $w_{ij}$ is the weight from the $i$-th hidden neuron to the $j$-th output neuron.

### ReadoutLayer sparsity
**Lambda Key:**`'lambda_out'`
#### Definition
ReadoutLayer sparsity loss function. The ReadoutLayer sparsity loss function is defined as:

$$ L_{out} = \frac{\lambda_{out}}{N_{out} N_{hid}} \sum_{i,j} w_{ij}^2 = \frac{\lambda_{out}}{N_{out} N_{hid}} ||W_{out}||_F^2 $$

where $N_{out}$ is the number of output neurons, $N_{hid}$ is the size of the input (of the ReadoutLayer), and $w_{ij}$ is the weight from the $i$-th output neuron to the $j$-th output neuron.

### Firing rate regularization
**Lambda Key:**`'lambda_fr'`
#### Definition
Firing rate loss function. The Firing rate loss function is defined as:

$$ L_{fr} = \frac{\lambda_{fr}}{N_{batch} T N_{hid}} \sum_{b,t,n=0}^{N_{batch}, T, N_{hid}} fr_{btn}^2 $$

where $N_{batch}$ is the batch size, $T$ is the number of time steps, $N_{out}$ is the number of output neurons, $fr_{btn}$ is the firing rate of neuron $n$ at time $t$ in the $i$-th batch.

### Firing rate regularization (standard deviation of the firing rate)
#### Definition
Regularize the SD of the HiddenLayer firing rates such that all neurons will fire at approximately the same rate. The Firing rate SD loss function is defined as:

$$ L_{fr\_sd} = \lambda_{fr\_sd} \sqrt{\frac{1}{N_{hid}} \sum_{n=0}^{N_{hid}} \left(\sum_{b,t=0}^{N_{batch}, T}\frac{fr_{bt}}{N_{batch} T} - \mu \right)^2} $$

$$ \mu = \frac{\lambda_{fr}}{N_{batch} T N_{hid}} \sum_{b,t,n=0}^{N_{batch}, T, N_{hid}} fr_{btn} $$

where $N_{batch}$ is the batch size, $T$ is the number of time steps, $ y_{bt} $ is the predicted firing rate of the neuron at time $t$ in the $i$-th batch, and $f_{bt}$ is the ground truth firing rate of the neuron at time $t$ in the $i$-th batch.<br>

**Lambda Key:**`'lambda_fr_sd'`

### Firing rate regularization (coefficient of variation of the firing rate)
#### Definition
Regularize the firing rate of a single neuron such that all neurons will fire at approximately the same rate. The Firing Rate Regularization loss function is defined as:

$$ L_{fr\_cv} = \lambda_{fr\_cv} \frac{\sigma}{\mu} $$

where $\sigma$ is the standard deviation of the firing rate of the neuron, and $\mu$ is the network mean firing rate.