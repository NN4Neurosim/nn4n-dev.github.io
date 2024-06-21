---
title: Parameters
author: Zhaoze Wang
date: 2024-06-16
category: docs
layout: post
order: 2
---

# Structure Parameters
These parameters primarily determine the structure of the network. It is recommended to check these parameters before initializing the network.

<div class="table-wrapper" markdown="block">

| Parameter | Default | Type | Description |
|:-:|:-:|:-:|:-:|
| dims | [1, 100, 1] | `list` | Dimensions of the network, must be a list of three integers [input_dim, hidden_size, output_dim] |
| activation | 'relu' | `string` | Activation function, could be 'relu', 'tanh', 'sigmoid', or 'retanh' |
| biases | `None` | `None`, `string`, or `list` | Use bias or not for each layer. A single value is broadcasted to a list of three values, which can be `None` (not using bias); 'zero' or 0 (bias initialized to 0 but could change during training); 'normal' (normal distribution), or ;'uniform' (bias initialized from a uniform distribution). If a list of three values is passed, each can be as described or a numpy array/torch tensor specifying the bias. |
| weights | 'uniform' | `string` or `list` | Distribution of weights for each layer. A single string is broadcasted to a list of three strings. Possible values: 'normal' (weights initialized from a normal distribution), 'uniform' (weights initialized from a uniform distribution). If a list of three values is passed, each can be as described or a numpy array/torch tensor specifying the weights. |

</div>


# Training Parameters
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

# Mask Parameters
When modeling the brain with neural networks, both the connections between neurons (synapses) and the neuron's non-linear activation functions are crucial components. Synapses, in particular, provide numerous degrees of freedom within the network. The connectivity matrix, for example, determines the network's structure, while various properties of synapses—such as their plasticity, whether they are excitatory or inhibitory, their strength, and the potential for new synapses to form—add layers of complexity and control. Here, we use masks to manage these characteristics.

<div class="table-wrapper" markdown="block">

| Parameter             | Default | Type                     | Description |
|:-:                    |:-:      |:-:                       |:-:          |
| sparsity_masks        | None    | `None` or `list`         | Use `sparsity_masks` or not. A single `None` will be broadcasted to a list of three `None`s. If a list of three values is passed, each value can be either `None` or a numpy array/torch tensor specifying the `sparsity_masks`. |
| ei_masks              | None    | `None` or `list`         | Use `ei_masks` or not. A single `None` will be broadcasted to a list of three `None`s. If a list of three values is passed, each value can be either `None` or a numpy array/torch tensor specifying the `ei_masks`. |
| plasticity_masks      | None    | `None` or `list`         | Use `plasticity_masks` or not. A single `None` will be broadcasted to a list of three `None`s. If a list of three values is passed, each value can be either `None` or a numpy array/torch tensor specifying the `plasticity_masks`. |
| synapse_growth_masks  | None    | `None` or `list`         | Use `synapse_growth_masks` or not. A single `None` will be broadcasted to a list of three `None`s. If a list of three values is passed, each value can be either `None` or a numpy array/torch tensor that directly specifies the probability of growing a synapse at the selected location if there is no synapse. |

</div>

# Parameter Specifications
#### Pre-Activation Noise and Post-Activation noise
When no noise is added, the network dynamic update as follows:

$$ \Delta \mathbf{v}^t = \gamma (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid}) $$

$$
\mathbf{v}^{t+1} = (1 - \gamma) \mathbf{v}^t + \gamma (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid})
$$

Let $\epsilon$ be the pre-activation noise and $\xi$ be post-activation noise.

##### Pre-Activation Noise
Pre-activation noise is added before the activation function is applied, its applied to the membrane potential and will thus be carried to the next step.

$$ \mathbf{v}^{t+1} = \mathbf{v}^{t+1} + \epsilon_t $$

$$ \mathbf{r}_{t} = f\left( \mathbf{v}^{t+1} \right) $$

##### Post-Activation Noise
Post-activation noise is added after the activation function, so it does not carry over to the next step. However, since it is not moderated by the activation function, it may lead to unstable behavior.

$$
\mathbf{r}_{t} = f\left( \mathbf{v}^{t+1} \right) + \xi_t
$$


#### Constraints and Masks

Constraints are enforced before each forward pass

##### Dale's Law:
Masks (input, hidden, and output) cannot be `None` if `positivity_constraints` is `True`.<br>
Only entry signs matter for the enforcement of Dale's law. All edges from the same neuron must be all excitatory or all inhibitory. This is enforced across training using the `relu()` and `-relu()` functions.<br>
When `positivity_constraints` is set to true, it will automatically balance the excitatory/inhibitory such that all synaptic strengths add up to zero.

##### New Synapse:
`sparsity_constraints` defines whether a neuron can 'grow' new connections.<br>
If plasticity is set to False, neurons cannot 'grow' new connections. A mask must be provided if `sparsity_constraints` is set to False.<br>
Only zeros entries matter. All entries that correspond to a zero value in the mask will remain zero across all time.

#### Self Connections:
Whether a neuron can connect to itself. This feature is enforced along with the `sparsity_constraints` mask. If mask is not specified but `self_connections` is set, a mask that only has zero entires on the diagonal will be generated automatically.

# Methods

<div class="table-wrapper" markdown="block">

| Method | Description |
|:-:|:-:|
| [`forward()`]({{ site.baseurl }}/rnn/methods/#ctrnnforward-) | Forward pass. |
| [`save()`]({{ site.baseurl }}/rnn/methods/#ctrnnsave-) | Save the network to a given path. |
| [`load()`]({{ site.baseurl }}/rnn/methods/#ctrnnload-) | Load the network from a given path. |
| [`print_layers()`]({{ site.baseurl }}/rnn/methods/#ctrnnprint_layers-) | Print the network architecture and layer-by-layer specifications. |
| [`train()`]({{ site.baseurl }}/rnn/methods/#ctrnntrain-) | Set the network to training mode, training will be performed and constraints will be enforced. Also, during training, the recurrent noises (preact_noise and postact_noise) won't be added. |
| [`eval()`]({{ site.baseurl }}/rnn/methods/#ctrnneval-) | Set the network to evaluation mode, no training will be performed and no constraints will be enforced. |
| [`layers`]({{ site.baseurl }}/rnn/methods/#ctrnnlayers) | Return a list of the network layers. |

</div>