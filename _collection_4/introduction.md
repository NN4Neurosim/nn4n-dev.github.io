---
title: Introduction
author: Zhaoze Wang
date: 2024-06-14
category: docs
layout: post
order: 1
---

# Introduction
In addition to training the model with respect to the task criteria, imposing penalties based on aspects such as the network's overall firing rate and the number of synapses can increase its biological plausibility.

Here, a few pre-implemented loss functions (constraints) are provided. Each criterion is designed in the format of $\lambda \mathcal{L}$. 

# Usage
By default, all $\lambda$ are set to 0 and won't be added to loss (nor the auto-grad tree). By changing the corresponding $\lambda$ to non-zero positive values, the corresponding loss function will be added to the total loss. The total loss is the sum of all loss functions with non-zero $\lambda$.

# List of Constraints
- [Mean Squared Error]({{ site.baseurl }}/constraint/mean_squared_error)
- [InputLayer Constraints]({{ site.baseurl }}/constraint/input_constraints)
- [HiddenLayer Constraints]({{ site.baseurl }}/constraint/hidden_constraints)
- [Readout Constraints]({{ site.baseurl }}/constraint/readout_constraints)
- [Firing Rate Constraints]({{ site.baseurl }}/constraint/fr_constraints)
