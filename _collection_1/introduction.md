---
title: Introduction
author: Zhaoze Wang
date: 2024-06-14
category: docs
layout: post
order: 1
---
# Mathematical Formulation
The terms *nodes*, *neurons*, and *units* are used interchangeably in this documentation to refer to the units in the `nn4n` models. In contrast, biological neurons are referred to exclusively as *neurons*.

## Simplified Network Model
First, consider a single neuron having a membrane potential $ v $ and a firing rate $ r $. Denote the external input to the neuron at time $ t $ as $ v^{in}(t) $. The dynamics of the membrane potential and firing rate are given by the following equations:

$$
\tau \frac{d v}{dt} = -v(t) + v^{in}(t) + b
$$

- $ \tau $: Time constant.
- $ b $: Bias term.

Generalizing to the entire network by extending the above equation to vector form:

$$
\tau \frac{d \mathbf{v}}{dt} = -\mathbf{v}(t) + \mathbf{v}^{in}(t) + \mathbf{b}
$$

- $ N_{hid} $: Number of neurons in the network.
- $ \mathbf{v} \in \mathbb{R}^{N_{hid}} $: Vector of membrane potentials for all neurons in the network.
- $ \mathbf{v}^{in} \in \mathbb{R}^{N_{hid}} $: Vector of external inputs to all neurons in the network.
- $ \mathbf{b} \in \mathbb{R}^{N_{hid}} $: Bias vector.

However, after generalizing to the entire network, at any given moment of time, a neuron receives not only external inputs but also signals from other neurons. The contribution of other neurons is given by $ \mathbf{W}^{rc} \mathbf{r}(t) $, where $ \mathbf{W}^{rc} \in \mathbb{R}^{N_{hid} \times N_{hid}} $ is the recurrent weight matrix denoting the cross-connections between neurons. The vector $ \textbf{r}(t) $ contains the firing rates (post-activation) of all neurons in the network at time $t$. 

Additionally, consider that the input could be multi-dimensional. Denote the input to the network at time $ t $ as $ \mathbf{u}(t) $, which will be mapped into $\mathbb{R}^{N_{hid}}$ via some input matrix $ \mathbf{W}^{in} \in \mathbb{R}^{N \times N_{in}} $ and $ \mathbf{u}(t) \in \mathbb{R}^{N_{in}} $, where $ N_{in} $ is the number of input dimensions. The dynamics of the network will then be:

$$
\tau \frac{d \mathbf{v}(t)}{dt} = -\mathbf{v}(t) + \mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + b
$$

In discrete time, we approximate the derivative with

$$
\frac{\mathbf{v}(t + \Delta t) - \mathbf{v}(t)}{\Delta t} \approx \frac{d \mathbf{v}(t)}{dt} = \frac{-\mathbf{v}(t) + \mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}}{\tau}
$$

$$
\implies \mathbf{v}(t + \Delta t) - \mathbf{v}(t) \approx \frac{\Delta t}{\tau} \left[-\mathbf{v}(t) + \mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}\right]
$$

For simplicity, denote $ \frac{\Delta t}{\tau} $ as $ \alpha $, and the equation becomes:

$$
\mathbf{v}(t + \Delta t) - \mathbf{v}(t) \approx \alpha \left[-\mathbf{v}(t) + \mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}\right]
$$

$$
\implies \mathbf{v}(t + \Delta t) \approx \mathbf{v}(t) + \alpha \left[-\mathbf{v}(t) + \mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}\right]
$$

$$
\implies \mathbf{v}(t + \Delta t) \approx (1 - \alpha) \mathbf{v}(t) + \alpha \left[\mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}\right]
$$

Here, if we switch the notation of $ t $ from continuous time to discrete time, the previous equation can be simplified to:

$$
\mathbf{v}(t+1) = (1 - \alpha) \mathbf{v}(t) + \alpha \left[\mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b}\right]
$$

Finally, biological system contains noise. The noise can be added either before or after the activation function. At time step $ t + 1 $, adding the noise before the activation function gives:

$$
\mathbf{v}(t+1) = (1 - \alpha) \mathbf{v}(t) + \alpha \left[\mathbf{W}^{rc} \mathbf{r}(t) + \mathbf{W}^{in} \mathbf{u}(t) + \mathbf{b} + \epsilon_t \right]
$$

Recall that $ \mathbf{r}(t) = f(\mathbf{v}(t)) $, where $ f(\cdot) $ is the activation function. Therefore, the noise added to the membrane potential at time $ t + 1 $ will be carried over to the calculation in the next time step.

On the other hand, adding noise after the activation function will only affect how the hidden layer response being read out. For a simple Single Layer Vanilla CTRNN, the hidden layer response will be linearly read out by the output projection matrix $ \mathbf{W}^{out} \in \mathbb{R}^{N_{out} \times N_{hid}} $.

$$
\mathbf{y}(t) = \mathbf{W}^{out} \mathbf{r}(t) \stackrel{\text{add noise}}{\longrightarrow} \mathbf{y}(t) = \mathbf{W}^{out} \left( \mathbf{r}(t) + \xi_t \right)
$$

But this will not affect the network dynamics in the following time steps.

<!-- $$ v_j^t = \gamma \sum_{i=1}^{N} w_{ij} r_i^{t-1} + (1-\gamma) v_j^{t-1} $$

$$ f_j^t = \left( v_j^t \right) $$

- $ r_j^t $: Firing rate of neuron $ j $ at time $ t $.
- $ f(\cdot) $: Activation function.
- $ \gamma $: Decay constant.
- $ w_{ij} $: Weight from neuron $ i $ to neuron $ j $.
- $ v_j^{t-1} $: Membrane potential of neuron $ j $ at time $ t-1 $.


Generalizing to the entire network, we have:

$$ \mathbf{v}^t = \gamma \mathbf{W} \mathbf{r}^{t-1} + (1-\gamma) \mathbf{v}^{t-1} $$

$$ \mathbf{r}^t = f\left( \mathbf{v}^t \right) $$

- $ \mathbf{r}^t $: Vector of firing rates for all neurons at time $ t $.
- $ \mathbf{W} $: Weight matrix.
- $ \mathbf{v}^{t-1} $: Vector of membrane potentials for all neurons at time $ t-1 $.

## RNN Dynamics
At every timestep, we assume that the neurons in the modeled brain region receive external inputs and signals from their neighboring neurons. These signals are then non-linearly integrated to produce an output. The dynamics of the Recurrent Neural Network (RNN) can be described by the following differential equation:

$$\tau \frac{d \mathbf{v}}{dt} = -\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid} + \epsilon_t$$

- $ \tau $: Time constant.
- $ \mathbf{W}_{hid} $: Weight matrix for the recurrent connections.
- $ \mathbf{W}_{in} $: Weight matrix for the external input.
- $ \mathbf{b}_{hid} $: Bias vector.
- $ \epsilon_t $: Pre-activation noise vector.

Re-write the equation in discrete time, we get an equation looks more similar to the one in the previous section:

$$
\Delta \mathbf{v}^t = \frac{dt}{\tau} (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid} + \epsilon_{t}) + \xi_{t}
$$

- $ \xi_{t} $: Post-activation noise vector.
- $ dt $: Discrete time step (how much time in real world does each time step represent).

Replacing $\frac{dt}{\tau}$ with $\gamma$ gives:

$$
\Delta \mathbf{v}^t = \gamma (-\mathbf{v}^t + \mathbf{W}_{hid} f(\mathbf{v}^t) + \mathbf{W}_{in} \mathbf{u}^t + \mathbf{b}_{hid} + \epsilon_{t}) + \xi_{t}
$$ -->


<!-- # Model Structure
```
├── CTRNN
│   ├── RecurrentLayer
│   │   ├── InputLayer (class LinearLayer)
│   │   ├── HiddenLayer
│   ├── Readout_areas (class LinearLayer)
``` -->
