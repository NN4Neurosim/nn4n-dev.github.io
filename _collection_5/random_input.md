---
title: mask.RandomInput
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 5
---

## Description
Randomly inject input to the network. Neurons' dynamic receiving input will be heavily driven by the inputting signal. Injecting signal to only part of the neuron will result in more versatile and hierarchical dynamics. See [A Versatile Hub Model For Efficient Information Propagation And Feature Selection](https://arxiv.org/abs/2307.02398) 

## Parameters

### Inherited Parameters
This class inherits all parameters from `BaseStruct`. See [BaseStruct]({{ site.baseurl }}/mask/base_struct) for more details.

### Other Parameters

<div class="table-wrapper" markdown="block">

| Parameter                     | Default                 | Type                       | Description                                |
|:------------------------------|:-----------------------:|:--------------------------:|:-------------------------------------------|
| input_spar                    | 1                       | `float`                    | Input sparsity. Percentage of neurons that receive input.             |
| readout_spar                  | 1                       | `float`                    | Readout sparsity. Percentage of neurons that readout from.              |
| hidden_spar                   | 1                       | `float`                    | Hidden sparsity. Percentage of edges that are non-zero.                |
| overlap                       | `True`                  | `boolean`                  | Whether a neuron can receive input and readout from.              |

</div>
