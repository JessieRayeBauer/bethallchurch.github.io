---
layout: post
title: Understanding Matrix Inversion
mathjax: true
---

The inverse of a number allows us to solve equations of the form $ax = b$:

$$
ax = b \\
a^{-1}ax = a^{-1}b \\
x = a^{-1}b \\
x = \frac{1}{a} \times b
$$

When confronted with a system of linear equations in the form of a matrix-vector product, it's natural to want to take the same approach:

$$
A\vec{x} = \vec{b} \\
A^{-1}A\vec{x} = A^{-1}\vec{b} \\
\vec{x} = A^{-1}\vec{b}
$$

$$
2x_1 + 3x_2 + 2x_3 = 1 \\
x_1 + 0x_2 + 4x_3 = 6 \\
3x_1 + 2x_2 + 0x_3 = 4
$$

$$
\begin{bmatrix}
    2 & 3 & 2 \\
    1 & 0 & 4 \\
    3 & 2 & 0
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
=
\begin{bmatrix}
1 \\
6 \\
4
\end{bmatrix}
$$

$$
\begin{bmatrix}
x_1 \\
x_2 \\
x_3
\end{bmatrix}
= 
\left(
\begin{bmatrix}
    2 & 3 & 2 \\
    1 & 0 & 4 \\
    3 & 2 & 0
\end{bmatrix}
\right)^{-1}
\begin{bmatrix}
1 \\
6 \\
4
\end{bmatrix}
$$

To do this we need a definition of the inverse of a matrix and a method for finding it. This post is about the definition and the constraints it places on what kinds of matrices are invertible.

## The Identity Matrix

In the equation $ax = b$, we were able to isolate $x$ by using the fact that any number multiplied by its inverse is 1, and any number multiplied by 1 is just itself. The matrix analogue of 1 is the *identity matrix*. The identity matrix is an $n\times n$ matrix with 1s along the main diagonal and 0s everywhere else.

$$
I_n =
\begin{bmatrix}
    1      & 0      & \dots  & 0 \\
    0      & 1      & \dots  & 0 \\
    \vdots & \vdots & \ddots & \vdots \\
    0      & 0      & \dots  & 1
\end{bmatrix}
$$

The product of the identity matrix and any vector is just the vector. 

$$
I_n\vec{x} = 
\begin{bmatrix}
    1      & 0      & \dots  & 0 \\
    0      & 1      & \dots  & 0 \\
    \vdots & \vdots & \ddots & \vdots \\
    0      & 0      & \dots  & 1
\end{bmatrix}
\begin{bmatrix}
    x_1 \\
    x_2 \\
    \vdots \\
    x_n
\end{bmatrix} = 
\begin{bmatrix}
    1x_1 + 0x_2 + \dots + 0x_n \\
    0x_1 + 1x_2 + \dots + 0x_n \\
    \vdots \\
    0x_1 + 0x_2 + \dots + 1x_n
\end{bmatrix} =
\begin{bmatrix}
    x_1 \\
    x_2 \\
    \vdots \\
    x_n
\end{bmatrix} =
\vec{x}
$$

Just as the inverse of a number is defined such that $a^{-1}a = 1$, the inverse of a matrix is defined such that:

$$
A^{-1}A = I_n \\
AA^{-1} = I_n
$$ 

Using this definition:

$$
A\vec{x} = \vec{b} \\
A^{-1}A\vec{x} = A^{-1}\vec{b} \\
I_n\vec{x} = A^{-1}\vec{b} \\
\vec{x} = A^{-1}\vec{b}
$$

## Matrices as Transformations

Say we have a matrix $A_1 = \begin{bmatrix} 1 & -1 \\\ 2 & 0 \end{bmatrix}$ and we multiply it by the vector $\vec{x} = \begin{bmatrix} 2 \\\ 1 \end{bmatrix}$. This has the effect of transforming $\vec{x}$ into the new vector $\begin{bmatrix} 1 \\\ 4 \end{bmatrix}$.

$$
\begin{bmatrix} 1 & -1 \\ 2 & 0 \end{bmatrix}\begin{bmatrix} 2 \\ 1 \end{bmatrix} = 
\begin{bmatrix}
    1\times 2 + -1\times 1 \\
    2\times 2 + 0\times 1
\end{bmatrix} =
\begin{bmatrix}
1 \\
4
\end{bmatrix}
$$

We'll call this transformation $T_1$, so that $T_1(\vec{x}) = A_1\vec{x}$. All linear transformations can be represented by a matrix. To apply a transformation to a vector is to multiply the matrix by that vector.

Transformations can be applied one after the other. Applying $T_1$ to $\vec{x}$ and then applying another transformation $T_2$ (represented by $A_2$) to the result is equivalent to multiplying the product of $A_2$ and $A_1$ by $\vec{x}$:

$$
T_2(T_1(\vec{x})) = A_2A_1\vec{x}
$$

The product of a matrix and its inverse is the identity matrix. Assuming A_2 is the inverse of A_1:

$$
A_2A_1 = I_2
$$

The product of the identity matrix and a vector is just that vector:

$$
I_2\vec{x} = \vec{x}
$$

Since A_2 is the inverse of A_1 we'll call the transformation it represents T_2 the inverse of T_1. Applying a transformation to a matrix and then applying the inverse of that transformation to the result is equivalent to applying no transformation at all:

$$
T_2(T_1(\vec{x})) = A_2A_1\vec{x} = I_2\vec{x} = \vec{x}
$$

![](https://beths3test.s3.amazonaws.com/misc/umi/umi_01.png)

The inverse of a transformation is the transformation that undoes its effects; the transformation that resets it. Not all transformations are invertible, because not all transformations can be undone.

## Column Space

A transformation takes a vector as input and produces another vector as output. The set of vectors it maps from is called the domain of the transformation. For example, if a transformation acts on vectors with two elements then its domain is the set of all 2-element vectors, $R^2$. A transformation's range is the set of vectors it maps to and its codomain is the set that those vectors belong to. A transformation might output vectors with three elements, and the set of these possible output vectors is its range. Its codomain is the set of all 3-element vectors, $R^3$, not just those that are mapped to. The range and the codomain can overlap completely, but not necessarily.

Matrix-vector multiplication can be thought of as transforming the input vector, but it can also be thought of as scaling and then adding the columns of $A$. Taking $R^2$ for instance, when $A$ is multiplied by $\vec{x}$, $\vec{x}$ essentially provides two scaling constants that scale the vectors represented by the columns of $A$. The sum of these two scaled vectors is the vector $\vec{b}$:

$$
T(\vec{x}) = 
A\vec{x} = 
\begin{bmatrix}
    a_{11} & a_{12} \\
    a_{21} & a_{22}
\end{bmatrix}
\begin{bmatrix}
    x_1 \\
    x_2
\end{bmatrix} =
x_1\begin{bmatrix}
    a_{11} \\
    a_{21}
\end{bmatrix} + 
x_2\begin{bmatrix}
    a_{12} \\
    a_{22}
\end{bmatrix} =
\vec{b}
$$

The column space of $A$  ($C(A)$) is the set of all the vectors that can be constructed by scaling and summing the columns of $A$. This is the set of all the possible solutions to $A\vec{x} = \vec{b}$ or, equivalently, the range of the transformation $T$.

## Conditions for Invertibility

A transformation is invertible if and only if:

- Every element of the codomain is mapped to by at most one element of the domain. (The transformation is *injective*.)
- Every element of the codomain is mapped to by at least one element of the domain. (The transformation is *surjective*.)

![Diagrams of (non-)injective and (non-)surjective sets](https://beths3test.s3.amazonaws.com/misc/umi/umi_02.jpg)

Transformations that are non-injective and/or non-surjective have no inverse. These kinds of transformations can't be undone.

### Non-Injective Transformations

Consider the transformation:

$$
T_2(\vec{x}) = A_2\vec{x} =
\begin{bmatrix}
    3 & 1 & 1 \\
    0 & 2 & 1
\end{bmatrix}\vec{x}
$$

$T_2(\vec{x})$ takes 3-element vectors as input and outputs 2-element vectors. Geometrically, its column space is a 2-dimensional plane and it squeezes all the vectors $R^3$ onto this plane.

![2D plane in 3D space](https://beths3test.s3.amazonaws.com/misc/umi/umi_03.png)

Thanks to this squeezing effect, multiple 3-element vectors map to the same 2-element vectors. For example, at least $\begin{bmatrix} 7/6 \\\ 3/2 \\\ 1 \end{bmatrix}$ and $\begin{bmatrix} 1 \\\ 1 \\\ 2 \end{bmatrix}$ are mapped to $\begin{bmatrix} 6 \\\ 4 \end{bmatrix}$.

This makes reversing the transformation problematic. Transformations can only output one vector for a single vector input. When the purported inverse of $T_2$ is fed $\begin{bmatrix} 6 \\\ 4 \end{bmatrix}$ as input it has to product at least both $\begin{bmatrix} 7/6 \\\ 3/2 \\\ 1 \end{bmatrix}$ and $\begin{bmatrix} 1 \\\ 1 \\\ 2 \end{bmatrix}$ as output. This is impossible and so the transformation $T_2$ is not invertible.

Transformations that are not injective have this problem generally: when reversed they need to produce multiple output vectors for a single input vector, which is impossible. This always happens when the transformation matrix has more columns than rows and so an invertible matrix must have at least as many rows as columns.

### Non-Surjective Transformations

Consider the transformation:

$$
T_3(\vec{x}) = A_3\vec{x} =
\begin{bmatrix}
    2 & 1 \\
    0 & 1 \\
    1 & 1
\end{bmatrix}\vec{x}
$$

This transformation goes in the reverse direction, mapping 2-element vectors to 3-element vectors. Again, the column space is a plane in $R^3$:

![2D plane in 3D space](https://beths3test.s3.amazonaws.com/misc/umi/umi_04.png)

The problem this time is that there are 3-element vectors that don't lie on that plane. These are elements that belong to $R^3$, the codomain of $T_3$, but which are not mapped to at all. The inverse of $T_3$ would have the domain $R^3$ but when fed any of the vectors that lie off the plane the output would be undefined. For this reason, $T_3$ is not invertible.

This is a problem for non-surjective transformations in general. They can't "get everywhere" in their codomain and so when the transformation is reversed there are multiple inputs for which the output is undefined. This always happens when the transformation matrix has more rows than columns and so an invertible matrix must have at least as many columns as rows.

This combined with the constraint that invertible matrices must have at least as many rows as columns implies that invertible matrices must be square.

## Linear Dependence

The requirement that a matrix be square is a necessary condition for invertibility, but it's not sufficient.

Consider the following transformation:

$$
T_4(\vec{x}) = A_4\vec{x} = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}\vec{x}
$$

This transformation takes 2-element vectors as input and produces 2-element vectors as output. However, the column vectors of $A_4$ lie on the same line:

![Linearly dependent vectors](https://beths3test.s3.amazonaws.com/misc/umi/umi_05.png)

Scaling and summing these vectors will only ever produce points on that line; the line is the column space of $A_4$. Despite having a square matrix, $T_4$ still squeezes $R^2$ onto a one-dimensional line and so fails to be injective. Not only that, since it maps to a straight line in $R^2$ meaning that plenty of vectors $R^2$ aren't mapped to at all, it isn't surjective either.

By contrast, the column vectors of $A_5$ are not on the same line and can be scaled and summed to construct any vector in $R^2$:

$$
T_5(\vec{x}) = A_5\vec{x} = \begin{bmatrix}
    2 & 1 \\
    1 & 2
\end{bmatrix}\vec{x}
$$

![Linearly independent vectors](https://beths3test.s3.amazonaws.com/misc/umi/umi_06.png)

This means that every vector in $R^2$ is mapped to, meaning the transformation is surjective. Not only that, when the columns are scaled and summed to construct an output vector the combination of scaling constants is unique to the output vector. This means that every possible output has only one solution, and so the transformation is injective as well.

If the column vectors of a $3\times 3$ matrix all lie on the same plane (as in an example above) then a squeezing effect will occur. It's harder to visualise at higher dimensions, but in general this effect is seen when at least one of the column vectors is a linear combination of one or more of the other column vectors (that is, can be constructed by scaling and/or summing one or more of the other vectors). If a set of vectors contains at least one vector that is a linear combination of one or more of the other vectors in the set then we call that set of vectors linearly dependent. When a set contains no vectors like this, the set is linearly independent. In linearly independent sets of vectors, every vector adds some more "directionality".

We finally have the necessary and sufficient conditions for invertibility. For a transformation with codomain $R^n$ to be invertible, its transformation matrix must be a square matrix with $n$ linearly independent columns.

## Summary

The inverse of a transformation is another transformation that reverses its effects. Transformations are only invertible when it's possible to reverse them. It's only possible to reverse a transformation that maps at most one element in its domain to every single element in its codomain. The only sorts of transformations that meet these requirements are those with square transformation matrices that have linearly independent columns.
