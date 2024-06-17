---
title: Parameters
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

## Model Structure
```
├── CTRNN
│   ├── RecurrentLayer
│   │   ├── InputLayer (class LinearLayer)
│   │   ├── HiddenLayer
│   ├── Readout_areas (class LinearLayer)
```
At the begining of each trial, the hidden states are set to zero. The RecurrentLayer, which contains the InputLayer and the HiddenLayer, is updated T/dt times during each trial. Finally, T/dt of hidden states are mapped out by the ReadoutLayer.<br>
For more details, refer to [Song et al. 2016](https://doi.org/10.1371/journal.pcbi.1004792).

## Parameters
### Structure parameters
These parameters primarily determine the structure of the network. It is recommended to check these parameters before initializing the network.

<div class="table-wrapper" markdown="block">

|Parameter|Default|Type|Description|
|:-:|:-:|:-:|:-:|
| input_dim | 1 | `int` | Input dimension |
| output_dim | 1 | `int` | Output dimension |
| hidden_size | 100 | `int` | Number of hidden nodes |
| scaling | 1.0 | `float` | Scaling factor for the hidden weights, it will scale the hidden weight by $\frac{scaling}{\sqrt{N\_{hid}}}$. Won't be affected when the HiddenLayer distribution is `uniform`. |
| self_connections | False | `boolean` | Whether a neuron can connect to itself |
| activation | `relu` | `string` | Activation function, could be `relu`/`tanh` / `sigmoid`/`retanh` |
| layer_distributions | `uniform` | `string`/`list` | Layer distributions. Either `string` or a `list` of three elements. The `string` or `list` element must be either `uniform`, `normal`, or `zero`. If the given value is a `string`, it will be broadcasted to all layers. If the provided value is a `list`, its length must match the number of layers in the network and contains only valid distribution values. |
| layer_biases | `True` | `boolean` or `list`  | Whether to use bias in each layer. Either a `boolean` or a `list` of three `boolean`s. If the given value is a list, its length must match the number of layers in the network and contains only `boolean` values. |

</div>


### Training parameters
These parameters primarily determine the training process of the network. The `tau` and `dt` parameters are used to discretize the continuous-time dynamics. It is **highly recommended** to check these parameters before training. They have a significant impact on the training result.

<div class="table-wrapper" markdown="block">

| Parameter | Default | Type | Description |	
|:-:|:-:|:-:|:-:|
| tau | 100 | `int` | Time constant |
| dt | 10 | `int` | Constant that used to discretize time |
| preact_noise | 0 | `float` | Whether to add zero-mean Gaussian preactivation noise during training. The noise is added before the activation function is applied. See difference between `preact_noise` and `postact_noise` [here](#preact_noise-and-postact_noise). |
| postact_noise | 0 | `float` | Whether to add zero-mean Gaussian postactivation noise during training. The noise is added after the activation function is applied. See difference between `preact_noise` and `postact_noise` [here](#preact_noise-and-postact_noise). |
| init_state | 'zero' | 'zero', 'keep', 'learn' | Method to initialize the hidden states. 'zero' will set the hidden states to zero at the beginning of each trial. 'keep' will keep the hidden states at the end of the previous trial. 'learn' will learn the initial hidden states. **Note:** 'keep' hasn't been tested yet. |

</div>

### Constraint parameters
These parameters primarily determine the constraints of the network. By default, the network is initialized using the most lenient constraints, i.e., no constraints being enforced.

<div class="table-wrapper" markdown="block">

| Parameter | Default | Type | Description |	
|:-:|:-:|:-:|:-:|
| positivity_constraints | False | `boolean`/`list` | Whether to enforce Dale's law. Either a `boolean` or a `list` of three `boolean`s. If the given value is a list, from the first element to the last element, corresponds to the InputLayer, HiddenLayer, and ReadoutLayer, respectively. |
| sparsity_constraints  | True | `boolean`/`list` | Whether a neuron can grow new connections. See [constraints and masks](#constraints-and-masks). If it's a list, it must have precisely three elements. Note: this must be checked even if your mask is sparse, otherwise the new connection will still be generated. |
| layer_masks | `None` or `list` | `list` of `np.ndarray` | Layer masks if `sparsity_constraints/positivity_constraints is set to true. From the first to the last, the list elements correspond to the mask for Input-Hidden, Hidden-Hidden, and Hidden-Readout weights, respectively. Each mask must have the same dimension as the corresponding weight matrix. See [constraints and masks](#constraints-and-masks) for details. |

</div>


## Parameter Specifications
### Pre-activation noise and post-activation noise
When no noise is added, the network dynamic update as follows:

$$ \Delta \mathbf{v}^t = \gamma (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid}) $$

$$
\mathbf{v}^{t+1} = (1 - \gamma) \mathbf{v}^t + \gamma (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid})
$$

Let $\epsilon$ be the pre-activation noise and $\xi$ be post-activation noise.

#### Pre-activation noise
Pre-activation noise is added before the activation function is applied, its applied to the membrane potential and will thus be carried to the next step.

$$ \mathbf{v}^{t+1} = \mathbf{v}^{t+1} + \epsilon_t $$

$$ \mathbf{r}_{t} = f\left( \mathbf{v}^{t+1} \right) $$

#### Post-activation noise
Post-activation noise is added after the activation function, so it does not carry over to the next step. However, since it is not moderated by the activation function, it may lead to unstable behavior.

$$
\mathbf{r}_{t} = f\left( \mathbf{v}^{t+1} \right) + \xi_t
$$


### Constraints and masks
Constraints are enforced before each forward pass
#### Dale's law:
Masks (input, hidden, and output) cannot be `None` if `positivity_constraints` is `True`.<br>
Only entry signs matter for the enforcement of Dale's law. All edges from the same neuron must be all excitatory or all inhibitory. This is enforced across training using the `relu()` and `-relu()` functions.<br>
When `positivity_constraints` is set to true, it will automatically balance the excitatory/inhibitory such that all synaptic strengths add up to zero.
#### New synapse:
`sparsity_constraints` defines whether a neuron can 'grow' new connections.<br>
If plasticity is set to False, neurons cannot 'grow' new connections. A mask must be provided if `sparsity_constraints` is set to False.<br>
Only zeros entries matter. All entries that correspond to a zero value in the mask will remain zero across all time.
#### Self connections:
Whether a neuron can connect to itself. This feature is enforced along with the `sparsity_constraints` mask. If mask is not specified but `self_connections` is set, a mask that only has zero entires on the diagonal will be generated automatically.

## Methods

<div class="table-wrapper" markdown="block">

| Method | Description |
|:-:|:-:|
| [`forward()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/forward.md) | Forward pass |
| [`save()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/save.md) | Save the network to a given path. |
| [`load()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/load.md) | Load the network from a given path. |
| [`print_layers()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/print_layers.md) | Print the network architecture and layer-by-layer specifications |
| [`train()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/train.md) | Set the network to training mode, training will be performed and constraints will be enforced. Also, during training, the recurrent noises (preact_noise and postact_noise) won't be added. |
| [`eval()`](https://github.com/zhaozewang/NN4Neurosci/blob/main/docs/model/CTRNN/methods/eval.md) | Set the network to evaluation mode, no training will be performed and no constraints will be enforced |

</div>