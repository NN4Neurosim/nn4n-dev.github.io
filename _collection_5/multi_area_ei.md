---
title: MultiAreaEI
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 4
---

## Description

This class is a child class of `MultiArea`. It will generate a multi-area RNN with E/I constraints. Therefore, by default, the input/hidden/readout masks are signed masks. Use cautious as it will change the sign of the weights. 

<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area_EI_Structure.png' | relative_url }}" width="500">
</p>

## Parameters

<div class="table-wrapper" markdown="block">

| Parameter                     | Default                 | Type                       | Description                                |
|:------------------------------|:-----------------------:|:--------------------------:|:-------------------------------------------|
| ext_pct                       | 0.8                     | `float`                    | Percentage of excitatory neurons              |
| inter_area_connections        |[True, True, True, True] | `list` (of booleans)       | Allows for what type of inter-area connections. `inter_area_connections` must be a `boolean` list of 4 elements, denoting whether 'exc-exc', 'exc-inh', 'inh-exc', and 'inh-inh' connections are allowed between areas. see [inter-area connections under EI constraints](#inter-area-connections-under-ei-constraints). |
| inh_readout                   | True                     | `boolean`                 | Whether to readout inhibitory neurons              |

</div>

## Inter-Area Connections Under EI Constraints
Depending on the specific problem you are investigating on, it is possible that you want to eliminate inhibitory connections between areas. Or, you might not want excitatory neurons to connect to inhibitory neurons in other areas. See figure below for different cases of inter-area connections under EI constraints.

<p align="center"><img src="{{ '/assets/images/basics/Multi_Area_EI.png' | relative_url }}" width="600"></p>

To specify what kinds of inter-area connections you want to keep, simple pass a 4-element boolean list to `inter_area_connections`. The 4 elements denotes whether to keep inter-area 'exc-exc', 'exc-inh', 'inh-exc', and 'inh-inh' connections.

<br>