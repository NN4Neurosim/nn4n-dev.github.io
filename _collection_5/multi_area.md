---
title: MultiArea
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 3
---


## Description

This will generate a multi-area RNN without E/I constraints. Therefore, by default, the input/hidden/readout masks are binary masks. Use cautious when the `positivity_constraints` parameter of CTRNN is set to `True`, because it will make all neurons to be excitatory.
**NOTE:** This also implicitly covers single area case. If `n_area` is set to 1. All other parameters that conflict this setting will be ignored.

<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area_Structure.png' | relative_url }}" width="500">
</p>

## Parameters

<div class="table-wrapper" markdown="block">

| Parameter | Default | Type | Description |
|:---------------------:|:-------------:|:------------------:|:-------------------------------------------:|
| n_areas              | 2            | `int` or `list`            | Number of areas.<br>- If `n_areas` is an integer, `n_areas` must be a divisor of `hidden_size`. It will divide the HiddenLayer into three equal size regions.<br>- If `n_areas` is a list, it must sums up to `hidden_size`, where each element in the list denote the number of neurons in that area.   |
| area_connectivities  | [0.1, 0.1]   |`list` or `np.ndarray`     | Area-to-area connection connectivity. Entries must between `[0,1]`<br>- If its a list of two elements, the first element is the forward connectivity, and the second is the backward connectivity. The within-area connectivity will be 1.<br>- If its a list of three elements, the last element will be the within-area connectivity.<br>- If `area_connectivities` is an `np.ndarray`, it must be of shape (`n_areas`, `n_areas`). See [forward/backward specifications](#forward-backward-specifications)|
| input_areas          | `None`       |`list` or `None`          | Areas that receive input. If set to `None`, all neurons will receive inputs. If set to a `list`, list elements should be the index of the areas that receive input. Set it to a list of one element if only one area receives input. | 
| readout_areas        | `None`       | `list` or `None`         | Areas that readout from. If set to `None`, all neurons will readout from. If set to a `list`, list elements should be the index of the areas that readout from. Set it to a list of one element if only one area readout from. |

</div>

<div class="table-wrapper" markdown="block">

| Attributes               | Type                       | Description                                |	
|:-------------------------|:--------------------------:|:-------------------------------------------|
| n_areas                  | `int`                      | Number of areas                            |
| node_assignment          | `list`                     | Nodes area assignment                      |
| hidden_size              | `int`                      | Number of nodes in the HiddenLayer         |
| input_dim                | `int`                      | Input dimension                            |
| output_dim               | `int`                      | Output dimension                           |
| area_connectivities      | `np.ndarray`               | Area-to-area connectivity matrix. If it is a list in params, it will be transformed into a numpy matrix after initialization                   |

</div>

## Forward Backward Specifications
RNNs can be implemented in various ways, in this library,
$$s W^T + b$$
is used in the HiddenLayer forward pass, where $W$ is the connectivity matrix of the HiddenLayer and $s$ is the current HiddenLayer state.<br>
$W$ may not matter if your connectivity matrix is symmetric. But if it's not, you might want to pay attention to the forward connections and backward connections. In the figure below, three networks (`n_areas` = 2, 3, 4) and their corresponding forward/backward connection matrix are provided. The blue regions are intra-area connectivity, the green regions are forward connections, and the red regions are backward connections.

<br>
<p align="center">
<img src="{{ '/assets/images/basics/Multi_Area.png' | relative_url }}" width="600">
</p>
<br>