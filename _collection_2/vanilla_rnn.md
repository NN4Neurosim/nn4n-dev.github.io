---
title: 'Example: Vanilla RNN'
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 10
---

```python
import nn4n
from nn4n.model import CTRNN

rnn = CTRNN()
rnn.print_layers()
```
This will create a Vanilla RNN with default parameters. The printed details of the network will be:
```
Linear Layer: 
   | input_dim:        1
   | output_dim:       100
   | weight_learnable: True
   | weight_min:       -0.9696310758590698
   | weight_max:       0.9939578771591187
   | bias_learnable:   False
   | bias_min:         0.0
   | bias_max:         0.0
   | sparsity:         1.0

Recurrence: 
   | init_hidden_min:      0.0
   | init_hidden_max:      0.0
   | preact_noise:         0
   | postact_noise:        0
   | activation:           relu
   | alpha:                0.1
   | init_state:           zero
   | init_state_learnable: False

Hidden Layer: 
   | input_dim:        100
   | output_dim:       100
   | weight_learnable: True
   | weight_min:       -0.09999535232782364
   | weight_max:       0.09997699409723282
   | bias_learnable:   False
   | bias_min:         0.0
   | bias_max:         0.0
   | sparsity:         1

Linear Layer: 
   | input_dim:        100
   | output_dim:       1
   | weight_learnable: True
   | weight_min:       -0.09923813492059708
   | weight_max:       0.09776326268911362
   | bias_learnable:   False
   | bias_min:         0.0
   | bias_max:         0.0
   | sparsity:         1.0
```