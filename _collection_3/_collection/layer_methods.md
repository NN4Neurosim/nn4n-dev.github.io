---
title: Layer Methods
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 4
---

# layer.set_weight( )

##### Description
Set the weight of the layer. Only applicable to the hidden_layer and linear_layer.

##### Parameters
> `weight`: (torch.Tensor), required. The weight tensor to be set. The shape of the weight tensor should be `(output_dim, input_dim)`.

##### Usage
```python
import torch
from nn4n.model import CTRNN

ctrnn = CTRNN()
weight = torch.rand(100, 1)
ctrnn.layers[0].set_weight(weight)
```