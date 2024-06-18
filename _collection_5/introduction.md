---
title: Introduction
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 1
---

# Defining Network Structures
The connectivity matrices between different layers are core to the modeling of the brain. They define the synaptic strength, positivity, plasticity, and other properties. In `nn4n`, these specific properties are applied to the corresponding connectivity matrices through masks. For complex structures such as excitatory-inhibitory constrainted RNN, the masks of adjacent layers are intercorrelated. The `nn4n.mask` modules provide some implementations to generate the masks for these complex structures.

##### Excitatory-Inhibitory Constrainted RNN
<p align="center">
<img src="{{ '/assets/images/basics/EIRNN_Structure.png' | relative_url }}" width="400">
</p>

##### Multi-Area RNN
<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area_Structure.png' | relative_url }}" width="400">
</p>

##### Multi-Area EI RNN
<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area_EI_Structure.png' | relative_url }}" width="400">
</p>

# List of Masks
- [BaseStruct]({{ site.baseurl }}/mask/base_struct)
- [MultiArea]({{ site.baseurl }}/mask/multi_area)
- [MultiAreaEI]({{ site.baseurl }}/mask/multi_area_ei)
- [RandomInput]({{ site.baseurl }}/mask/random_input)