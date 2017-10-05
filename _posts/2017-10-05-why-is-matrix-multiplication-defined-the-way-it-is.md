---
layout: post
title: Why is Matrix Multiplication Defined the Way It Is?
mathjax: true
---

<p class="description">I've been learning linear algebra lately so I'll probably write a few posts on it. They're not really intended as learning resources for anyone else; writing up summaries of what I've learnt is just my way of making sure I understand the topic thoroughly, and making those summaries publically accessible forces me to put some effort into them.</p> 

The way matrix addition is defined makes it a straightforward analogue of its number counterpart:

$$
\underset{m\times n}{A} + \underset{m\times n}{B} = \begin{bmatrix}
                        a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n} \\
                        a_{21} + b_{21} & a_{22} + b_{22} & \cdots & a_{2n} + b_{2n} \\
                        \vdots & \vdots & \ddots & \vdots  \\
                        a_{m1} + b_{m1} & a_{m2} + b_{m2} & \cdots & a_{mn} + b_{mn}
                    \end{bmatrix}
$$

The operation as it applies to numbers is simply applied to the corresponding elements of matrices of the same shape. This means that matrix addition behaves in a similar way to number addition; both are commutative ($A + B = B + A$) and associative ($A + (B + C) = (A + B) + C$).

You might reasonably expect matrix multiplication to be defined as:

$$
\underset{m\times n}{A}\underset{m\times n}{B} = \begin{bmatrix}
                    a_{11}b_{11} & a_{12}b_{12} & \cdots & a_{1n}b_{1n} \\
                    a_{21}b_{21} & a_{22}b_{22} & \cdots & a_{2n}b_{2n} \\
                    \vdots & \vdots & \ddots & \vdots  \\
                    a_{m1}b_{m1} & a_{m2}b_{m2} & \cdots & a_{mn}b_{mn}
                 \end{bmatrix}
$$ 

But although this is the definition of a certain type of matrix multiplication, it's not matrix multiplication in the generic sense of the term. In general, matrix multiplication is defined in this oddly counterintuitive way:

$$
\underset{m\times n}{A}= \begin{bmatrix}
            a_{11} & a_{12} & \cdots & a_{1n} \\
            a_{21} & a_{22} & \cdots & a_{2n} \\
            \vdots & \vdots & \ddots & \vdots  \\
            a_{m1} & a_{m2} & \cdots & a_{mn} \\
         \end{bmatrix}
\quad
\underset{n\times p}{B}= \begin{bmatrix}
            b_{11} & b_{12} & \cdots & b_{1p} \\
            b_{21} & b_{22} & \cdots & b_{2p} \\
            \vdots & \vdots & \ddots & \vdots  \\
            b_{n1} & b_{n2} & \cdots & b_{np} \\
         \end{bmatrix} \\
\underset{m\times p}{AB} = \begin{bmatrix}
                  a_{11}b_{11} + a_{12}b_{21} + \dots + a_{1n}b_{n1} & a_{11}b_{12} + a_{12}b_{22} + \dots + a_{1n}b_{n2} & \cdots & a_{11}b_{1p} + a_{12}b_{2,p} + \dots + a_{1n}b_{np} \\
                  a_{21}b_{11} + a_{22}b_{21} + \dots + a_{2n}b_{n1} & a_{21}b_{12} + a_{22}b_{22} + \dots + a_{2n}b_{n2} & \cdots & a_{21}b_{1p} + a_{22}b_{2p} + \dots + a_{2n}b_{np} \\
                  \vdots & \vdots & \ddots & \vdots  \\
                  a_{m1}b_{11} + a_{m2}b_{21} + \dots + a_{mn}b_{n1} & a_{m1}b_{12} + a_{m2}b_{22} + \dots + a_{mn}b_{n2} & \cdots & a_{m1}b_{1p} + a_{m2}b_{2p} + \dots + a_{mn}b_{np}
                 \end{bmatrix}
$$

The first entry is the first row of $A$ multiplied element-wise by the first column of $B$, and the results summed. In general, the entry at row $i$, column $j$, $(AB)_{ij}$, is the sum of $i$th column of $A$ multiplied by the $j$th column of $B$:

$$
(AB)_{ij} = \sum^m_{k=1}A_{ik}B_{kj}
$$

Matrix multiplication therefore exhibits some unusual properties. It's not necessarily defined for matrices of the same shape; instead it's defined only when the first matrix has the same number of columns as the second matrix has rows. It also behaves very differently from number multiplication. In particular, while number multiplication is commutative, matrix multiplication is not. $AB$ does not necessarily equal $BA$, and may not even be defined.

Why is matrix multiplication defined like this?

## Vector Spaces

Consider a vector with two entries, $\vec{x} = \begin{bmatrix}x_1 \\\ x_2\end{bmatrix}$. Imagine all the possible combinations of real numbers that could make up that vector. That set of vectors is the vector space $\mathbb{R}^2$. The set of all possible three element vectors is $\mathbb{R}^3$, and the set of all possible $n$ element vectors is $\mathbb{R}^n$.

We can represent $\mathbb{R}^2$ as a grid:

![](https://beths3test.s3.amazonaws.com/misc/1_1.png)

In this grid, vectors are points and the lines on the grid are sets of vectors with a value in common.

![](https://beths3test.s3.amazonaws.com/misc/1_2.png)

The green line is the set of vectors $\vec{x} = \begin{bmatrix} x_1 \\\ x_2 \end{bmatrix}$ where $x_1 = 3$; the yellow line is the set of vectors $\vec{x} = \begin{bmatrix} x_1 \\\ x_2 \end{bmatrix}$ where $x_2 = 1$. Not every vector is shown - if they were the grid would just be a solid block of colour!

## Linear Transformations

Transformations in linear algebra are just functions. They take some input and produce some output or, more formally, they provide a mapping from one set to another (or the same) set. We can imagine a transformation acting on an entire vector space thereby transforming that space.

Say we have a transformation $T_1$ that takes any 2-dimensional vector as input and outputs another 2-dimensional vector. The shorthand for this is $T_1: \mathbb{R}^2 \to \mathbb{R}^2$.

$$
T_1(\vec{x}) = T_1(\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}) = \begin{bmatrix} 2x_1 \\ 3x_2 \end{bmatrix}
$$

$T_1$ will transform $\mathbb{R}^2$ by doubling every vector in the $x_1$ direction and tripling it in the $x_2$ direction:

![](https://beths3test.s3.amazonaws.com/misc/1_3.png)

Here's another transformation:

$$
T_2(\vec{x}) = T_2(\begin{bmatrix} x_1 \\ x_2 \end{bmatrix}) = \begin{bmatrix} x_1x_2^2 \\ 2x_2 \end{bmatrix}
$$

The transformation $T_2$ is different from $T_1$ in a very important respect; it is nonlinear whereas $T_1$ is linear. To see why, consider the geometric interpretation of $T_2$:

![](https://beths3test.s3.amazonaws.com/misc/1_5.png)

For a transformation to be linear gridlines must remain parallel and evenly spaced, and the origin must remain fixed. The curving and uneven spacing of the gridlines when $T_2$ is applied shows that it is nonlinear. As suggested by its name, linear algebra is concerned with linear transformations.

The requirement that the gridlines must remain parallel and evenly spaced and the origin must remain fixed are captured by the following conditions. A transformation $T: \mathbb{R}^m \to \mathbb{R}^n$ is linear if and only if:

1. $T(\vec{a} + \vec{b}) = T(\vec{a}) + T(\vec{b})$
2. $T(\lambda\vec{a}) = \lambda T(\vec{a})$

Where $\vec{a}$ and $\vec{b}$ are members of $\mathbb{R}^m$ and $\lambda$ is a real number. The first condition means that it doesn't matter if you do the addition first and the transformation second or the transformation first and the addition second; it preserves addition. The second condition means it doesn't matter if you do the multiplication first and the transformation second or the transformation first and the multiplication second; it preserves scalar multiplication.

Transformations don't always transform a single vector space. You can have transformations that take a 2-dimensional vector as input and output a 3-dimensional vector, going from $\mathbb{R}^2$ to $\mathbb{R}^3$. These are harder to visualise, but any transformation from $\mathbb{R}^m$ to $\mathbb{R}^n$ that preserves both addition and scalar multiplication is linear all the same.

## Matrix-Vector Multiplication

The vectors $\hat{\imath} = \begin{bmatrix}1 \\\ 0\end{bmatrix}$ and $\hat{\jmath} = \begin{bmatrix}0 \\\ 1\end{bmatrix}$ are particularly useful because any vector in $\mathbb{R}^2$ can be easily represented with them:

$$
\vec{x} = \begin{bmatrix}x_1 \\ x_2\end{bmatrix} = x_1\begin{bmatrix} 1 \\ 0 \end{bmatrix} + x_2\begin{bmatrix} 0 \\ 1 \end{bmatrix} = x_1\hat{\imath} + x_2\hat{\jmath}
$$

We know that $T_1$ is a linear transformation and as such it preserves addition:

$$
T_1(\vec{x}) = T_1(x_1\hat{\imath} + x_2\hat{\jmath}) = T_1(x_1\hat{\imath}) + T_1(x_2\hat{\jmath})
$$

And it preserves scalar multiplication:

$$
T_1(x_1\hat{\imath}) + T_1(x_2\hat{\jmath}) = x_1T_1(\hat{\imath}) + x_2T_1(\hat{\jmath})
$$

This is a really interesting result. It's basically saying that you can work out $T_1(\vec{x})$ for any vector $\vec{x} \in \mathbb{R}^2$ by applying the transformation to $\hat{\imath}$ and $\hat{\jmath}$, multiplying those by $x_1$ and $x_2$, respectively, and then summing the results:

$$
T_1(\hat{\imath}) = \begin{bmatrix}2\\0\end{bmatrix} \\
T_1(\hat{\jmath}) = \begin{bmatrix}0\\3\end{bmatrix} \\
T_1(\vec{x}) = x_1\begin{bmatrix}2\\0\end{bmatrix} + x_2\begin{bmatrix}0\\3\end{bmatrix} = \begin{bmatrix}2x_1 + 0x_2\\0x_1 + 3x_2\end{bmatrix}
$$

The matrix $\begin{bmatrix}2x_1 + 0x_2 \\\ 0x_1 + 3x_2\end{bmatrix}$ is just $\begin{bmatrix}2 & 0 \\\ 0 & 3\end{bmatrix}\begin{bmatrix}x_1 \\\ x_2 \end{bmatrix}$, according to the definition of matrix multiplication.

Let's look at the general case for $\mathbb{R}^2$:

$$
T(\vec{x}) = x_1T(\hat{\imath}) + x_2T(\hat{\jmath}) = x_1\begin{bmatrix}a \\ c \end{bmatrix} + x_2\begin{bmatrix}b \\ d \end{bmatrix} = \begin{bmatrix} ax_1 + bx_2 \\ cx_1 + dx_2 \end{bmatrix}
$$

It's convenient to collect $\hat{\imath}$ and $\hat{\jmath}$ into a single matrix $\begin{bmatrix}1 & 0 \\\ 0 & 1\end{bmatrix}$. We can then find $T(\vec{x})$ for any linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^2$ by applying the transformation to the columns of a matrix with $\hat{\imath}$ and $\hat{\jmath}$ as its columns, and multiplying the resulting matrix by $\vec{x}$:

$$
T: \mathbb{R}^2 \to \mathbb{R}^2 \\
\underset{2\times 2}{I} = \begin{bmatrix}1 & 0 \\ 0 & 1\end{bmatrix} \\
T(\underset{2\times 2}{I}) = \begin{bmatrix} a & b \\ c & d \end{bmatrix} \\
T(\vec{x}) = T(\underset{2\times 2}{I})\vec{x} = \begin{bmatrix} a & b \\ c & d \end{bmatrix}\begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = x_1\begin{bmatrix}a \\ c\end{bmatrix} + x_2\begin{bmatrix}b \\ d\end{bmatrix} = \begin{bmatrix} ax_1 + bx_2 \\ cx_1 + dx_2 \end{bmatrix}
$$

Under this definition of matrix multiplication we can represent transformations as matrix-vector products, for transformations that map from $\mathbb{R}^2$ to $\mathbb{R}^2$ at least. Let's see some more examples.

For $\mathbb{R}^3$ we set $\hat{\imath}$ equal to $\begin{bmatrix}1 \\\ 0 \\\ 0\end{bmatrix}$, $\hat{\jmath}$ equal to $\begin{bmatrix}0 \\\ 1 \\\ 0\end{bmatrix}$ and introduce a new vector $\hat{k} = \begin{bmatrix}0 \\\ 0 \\\ 1\end{bmatrix}$:

$$
T: \mathbb{R}^3 \to \mathbb{R}^3 \\
\underset{3\times 3}{I} = \begin{bmatrix}1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1\end{bmatrix} \\
T(\underset{3\times 3}{I}) = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i\end{bmatrix} \\
T(\vec{x}) = \begin{bmatrix} a & b & c \\ d & e & f \\ g & h & i\end{bmatrix}\begin{bmatrix}x_1 \\ x_2 \\ x_3 \end{bmatrix} = x_1\begin{bmatrix}a \\ d \\ g\end{bmatrix} + x_2\begin{bmatrix}b \\ e \\ h\end{bmatrix} + x_3\begin{bmatrix}c \\ f \\ i\end{bmatrix} = \begin{bmatrix} ax_1 + bx_2 + cx_3  \\ dx_1 + ex_2 + fx_3 \\ gx_1 + hx_2 + ix_3 \end{bmatrix}
$$

What about transformations that go from $\mathbb{R}^2$ to $\mathbb{R}^3$?

$$
T: \mathbb{R}^2 \to \mathbb{R}^3 \\
\underset{2\times 2}{I} = \begin{bmatrix}1 & 0 \\ 0 & 1\end{bmatrix} \\
T(\underset{2\times 2}{I}) = \begin{bmatrix}a & b \\ c & d \\ e & f\end{bmatrix} \\
T(\vec{x}) = \begin{bmatrix}a & b \\ c & d \\ e & f\end{bmatrix}\begin{bmatrix}x_1 \\ x_2 \end{bmatrix}
= x_1\begin{bmatrix}a \\ c \\ e\end{bmatrix} + x_2\begin{bmatrix}b \\ d \\ f\end{bmatrix}
= \begin{bmatrix} ax_1 + bx_2 \\ cx_1 + dx_2 \\ ex_1 + fx_2\end{bmatrix}
$$

And finally, transformations that go from $\mathbb{R}^m$ to $\mathbb{R}^n$

$$
T: \mathbb{R}^m \to \mathbb{R}^n \\
\underset{m\times m}{I} = \begin{bmatrix}1 & 0 & \cdots & 0 \\ 0 & 1 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 1 \end{bmatrix} \\
T(\underset{m\times m}{I}) = \underset{n\times m}{A} = \begin{bmatrix}a_{1,1} & a_{1,2} & \cdots & a_{1,m} \\ a_{2,1} & a_{2,2} & \cdots & a_{2,m} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n,1} & a_{n,2} & \cdots & a_{n,m}\end{bmatrix} \\
T(\vec{x}) = \begin{bmatrix}a_{1,1} & a_{1,2} & \cdots & a_{1,m} \\ a_{2,1} & a_{2,2} & \cdots & a_{2,m} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n,1} & a_{n,2} & \cdots & a_{n,m}\end{bmatrix}\begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_m \end{bmatrix} = x_1\begin{bmatrix}a_{1,1} \\ a_{2,1} \\ \vdots \\ a_{n,1}\end{bmatrix} + x_2\begin{bmatrix}a_{1,2} \\ a_{2,2} \\ \vdots \\ a_{n,2}\end{bmatrix} + \dots + x_m\begin{bmatrix}a_{1,m} \\ a_{2,m} \\ \vdots \\ a_{n,m}\end{bmatrix} \\
T(\vec{x}) = \begin{bmatrix}a_{1,1}x_1 + a_{1,2}x_2 + \cdots + a_{1,m}x_m \\ a_{2,1}x_1 + a_{2,2}x_2 + \cdots + a_{2,m}x_m \\ \vdots \\ a_{n,1}x_1 + a_{n,2}x_2 + \cdots + a_{n,m}x_m\end{bmatrix}
$$

Matrix-vector multiplication, then, gives us a method for easily applying a transformation to any given vector. Any transformation from $\mathbb{R}^m$ to $\mathbb{R}^n$ can be represented by an $n\times m$ matrix. This makes it a much more powerful tool than element-wise multiplication.

## Matrix-Matrix Multiplication

Say we want to apply two transformations, $F_1$ and $F_2$, one after the other.

$$
F_1: \mathbb{R}^2 \to \mathbb{R}^2 \\
F_2: \mathbb{R}^2 \to \mathbb{R}^2 \\
F_1(\vec{x}) = \begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}\vec{x} \\
F_2(\vec{x}) = \begin{bmatrix}1 & -1 \\ 1 & 0\end{bmatrix}\vec{x}
$$

Let's see how these transformations affect $\hat{\imath}$ and $\hat{\jmath}$. Before either transformation is applied, $\hat{\imath}$ and $\hat{\jmath}$ look like this:

![](https://beths3test.s3.amazonaws.com/misc/1_6.png)

Now let's apply $F_1$:

$$
F_1(\hat{\imath}) = \begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix}0 \\ 1\end{bmatrix} \\
F_1(\hat{\jmath}) = \begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 1 \\ 0 \end{bmatrix}\\
$$

![](https://beths3test.s3.amazonaws.com/misc/1_7.png)

And then apply $F_2$ to $\hat{\imath}$ and $\hat{\jmath}$ in their new positions:

$$
F_2(F_1(\hat{\imath})) = \begin{bmatrix}1 & -1 \\ 1 & 0\end{bmatrix}\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix}-1 \\ 0\end{bmatrix}\\
F_2(F_1(\hat{\jmath})) = \begin{bmatrix}1 & -1 \\ 1 & 0\end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix}1 \\ 1\end{bmatrix}
$$

![](https://beths3test.s3.amazonaws.com/misc/1_8.png)

The new values of $\hat{\imath}$ and $\hat{\jmath}$ are $F_2(F_1(\hat{\imath})) = \begin{bmatrix} -1 \\\ 0\end{bmatrix}$ and $F_2(F_1(\hat{\jmath})) = \begin{bmatrix} 1 \\\ 1\end{bmatrix}$. We can use the matrix that has these vectors as columns to work out where any vector with $F_1$ and then $F_2$ applied ends up.

$$
F_3: \mathbb{R}^2 \to \mathbb{R}^2 \\
F_3(\vec{x}) = \begin{bmatrix}-1 & 1 \\ 0 & 1\end{bmatrix}\vec{x}
$$

$F_3$ is another transformation, called the *composition* of $F_1$ and $F_2$. If we retrace our steps a bit more, it becomes obvious why matrix-matrix multiplication is defined the way it is:

$$
F_3(\vec{x}) = F_2(F_1(\vec{x})) = \begin{bmatrix}1 & -1 \\ 1 & 0\end{bmatrix}(\begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix}\vec{x}) = \begin{bmatrix}-1 & 1 \\ 0 & 1\end{bmatrix}\vec{x}
$$

Given this equation, it seems natural to define matrix-matrix multiplication so that:

$$
\begin{bmatrix}1 & -1 \\ 1 & 0\end{bmatrix}\begin{bmatrix}0 & 1 \\ 1 & 0\end{bmatrix} = \begin{bmatrix}-1 & 1 \\ 0 & 1\end{bmatrix}
$$

Which of course is exactly how it is defined. This also gives us a clue as to why matrix multiplication is not commutative. Applying the transformations in the order $F_2$ then $F_1$ would result in vectors ending up in different positions to where they end up when we apply them $F_1$ then $F_2$.

Thinking of matrices as linear transformations gives more insight into why only matrices of certain shapes can be multiplied together. We saw in the previous section that a transformation that maps, for example, from $\mathbb{R}^2$ to $\mathbb{R}^3$ can be represented by an $3\times 2$ matrix. This is because it transforms a $2\times 1$ vector to a $3\times 1$ vector. If you had a composition of transformations mapping from $\mathbb{R}^2$ to $\mathbb{R}^3$ and back to $\mathbb{R}^2$ again you would need a matrix that transforms a $2\times 1$ vector to a $3\times 1$ vector and then another matrix that transforms a $3\times 1$ vector to a $2\times 1$ vector. A $3\times 2$ matrix would take you from $\mathbb{R}^2$ to $\mathbb{R}^3$ and a $2\times 3$ matrix would take you from $\mathbb{R}^3$ to $\mathbb{R}^2$. But it doesn't make sense to multiply a $2\times 3$ matrix by another $2\times 3$ matrix. The result of transforming a vector with $2\times 3$ matrix is a $3\times 1$ vector. That's not suitable input for a transformation from $\mathbb{R}^2$ to $\mathbb{R}^3$, which is what another $2\times 3$ matrix would represent.

## Summary

Matrices represent linear transformations. Multiplying a matrix by a vector applies the transformation to that vector. Multiplying matrices together combines transformations in a particular order; the resulting matrix multiplied by a vector is equivalent to applying all those transformations in that order to the vector.

## References

+ [The Essence of Linear Algebra, 3Blue1Brown](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
+ [Linear Algebra, Khan Academy](https://www.khanacademy.org/math/linear-algebra)
