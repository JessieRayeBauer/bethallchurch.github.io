---
layout: post
title: Jupyter Notebooks with Jekyll
---

<p class="description">I wanted to find a way of writing in Jupyter Notebooks and then posting the result on my Jekyll blog. The best resource I found was <a href="https://briancaffey.github.io/2016/03/14/ipynb-with-jekyll.html">this post</a>. However, parts of the process it describes have to be done manually. I've written a bash script to automate the entire conversion.</p>

With Jupyter Notebooks, you can write Python code and immediately view the output:


```python
# Source: https://matplotlib.org/examples/mplot3d/contour3d_demo.html
from mpl_toolkits.mplot3d import axes3d
import matplotlib.pyplot as plt
from matplotlib import cm

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
X, Y, Z = axes3d.get_test_data(0.05)
cset = ax.contour(X, Y, Z, cmap=cm.coolwarm)
ax.clabel(cset, fontsize=9, inline=1)

plt.show()
```


![png](/images/2017-08-16-jupyter-notebooks-with-jekyll_1_0.png)


It's relatively easy to convert a notebook to a markdown file suitable for posting on a Jekyll blog. This is the process I use.

The folder structure of my blog looks like this:

```bash
bethallchurch.github.io
    ├── 404.md
    ├── CNAME
    ├── JEKYLL_README.md
    ├── LICENSE
    ├── README.md
    ├── _config.yml
    ├── _includes
    ├── _jupyter
    ├── _layouts
    ├── _posts
    ├── _sass
    ├── _site
    ├── convert.sh
    ├── favicon.ico
    ├── images
    ├── index.html
    └── style.scss
```

The important folders are `_jupyter`, which is where I keep my Jupyter Notebooks, `_posts`, and `images`. The bash script that does the conversion (`convert.sh`) is also in the root. If I want to convert this notebook, which I've called `jupyter-notebooks-with-jekyll`, I run the following command from the root of my project:

```bash
bash convert.sh jupyter-notebooks-with-jekyll
```

This runs the `convert.sh` script, which converts the file `_jupyter/jupyter-notebooks-with-jekyll.ipynb` to `_posts/jupyter-notebooks-with-jekyll.md`. Additionally, it moves any notebook-generated images to the `images` folder and updates the image paths accordingly. Finally, it does a little bit of formatting to make sure the post displays correctly.

The script in full:

```
#!/bin/bash
#
# Convert Jupyter notebook files (in _jupyter folder) to markdown files (in _posts folder).
#
# Arguments: 
# $1 filename (excluding extension)
# 

# Generate a filename with today's date.
filename=$(date +%Y-%m-%d)-$1

# Jupyter will put all the assets associated with the notebook in a folder with this naming convention.
# The folder will be in the same output folder as the generated markdown file.
foldername=$filename"_files"

# Do the conversion.
jupyter nbconvert ./_jupyter/$1.ipynb --to markdown --output-dir=./_posts --output=$filename

# Move the images from the jupyter-generated folder to the images folder.
echo "Moving images..."
mv ./_posts/$foldername/* ./images

# Remove the now empty folder.
rmdir ./_posts/$foldername

# Go through the markdown file and rewrite image paths.
# NB: this sed command works on OSX, it might need to be tweaked for other platforms.
echo "Rewriting image paths..."
sed -i.tmp -e "s/$foldername/\/images/g" ./_posts/$filename.md

# Remove backup file created by sed command.
rm ./_posts/$filename.md.tmp

# Check if the conversion has left a blank line at the top of the file. 
# (Sometimes it does and this messes up formatting.)
firstline=$(head -n 1 ./_posts/$filename.md)
if [ "$firstline" = "" ]; then
  # If it has, get rid of it.
  tail -n +2 "./_posts/$filename.md" > "./_posts/$filename.tmp" && mv "./_posts/$filename.tmp" "./_posts/$filename.md"
fi

echo "Done converting."
```

There might be other ways of blogging with Jupyter, but I like my Jekyll blog and for the moment this solution works well for me.


## Resources

+ [GitHub Pages](https://pages.github.com/)
+ [Project Jupyter](http://jupyter.org/)
+ [Jekyll](https://jekyllrb.com/)
+ [Brian Caffey: Including Jupyter Notebooks in Jekyll blog posts](https://briancaffey.github.io/2016/03/14/ipynb-with-jekyll.html)
