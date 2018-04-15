
<h1>Missing Data: Using Multiple Imputation to Conduct a Mediation Analysis in R<h1>

<h2>**Note: Full code &amp; Jupyter notebook are available <a href="https://github.com/JessieRayeBauer/MICE_R/blob/master/mice_med_in_R.ipynb" title="HERE">HERE.</a></h2>
<p>Multiple imputation is an extremely&nbsp;helpful and powerful&nbsp;tool when you have missing data. As a child development researcher, my data is particularly prone to missingness. Parents might not want to return to the lab, children get sleepy or fussy- it happens.</p>
<p>However, there are ways to successfully and accurately reduce errors and bias caused by missing data. I found an article by Enders (2012)&nbsp;by&nbsp;to be extremely helpful in explaining the benefits of imputation as opposed to case-wise deletion- which is the most common practice&nbsp;in developmental research.&nbsp;</p>
<p>Before going forward, I used&nbsp;van Buuren's&nbsp;article to help me create the code, think about multiple imputation on a theoretical level, and also decide which parameters to use. I highly recommend you read through his article before pursuing&nbsp;multiple imputation!</p>
<p>For a recent project, I decided to use multiple imputation. I had&nbsp;rates of missingness ranging from 0% to 23%. Many sources (e.g., Little &amp; Rubin, 2002;&nbsp;Bodner, 2008; White, Royston, &amp; Wood, 2011) suggest creating&nbsp;as many datasets as the average rate of missing. So, in my case, I had an average of 10% missing, so I created 10 imputed datasets.&nbsp;</p>
<p>**Note, if you want your results to be consistent (for sharing or publishing purposes, make sure to set your seed when imputing!)</p>
<p><br />Using 'mice' package in R was very easy, and I had little trouble generating imputed datasets or pooling them. I also found&nbsp;visualizing&nbsp;the imputed data and comparing it&nbsp;to the original data using the 'VIM' package to be helpful. Using 'mice' to run linear regression models was also fairly simple.</p>
<p>Where I ran into trouble was using 'mice' and 'lavaan' to run a mediation analysis using my imputed data sets. Here is how I solved it- I hope it helps!</p>
<p>First, load your libraries (download if needed).&nbsp;Next, read in a dataset ('airquality') and create some fake missing data. Then, have a look at the data:&nbsp;<br />&nbsp;</p>

<script src="https://gist.github.com/JessieRayeBauer/60d4939d25fe1e70bef48a36946377ff.js"></script>

<p><br />&nbsp;<br />Next, let's look at how much data is missing for each variable. Be wary of missing data patterns higher than&nbsp;5%.</p>
<script src="https://gist.github.com/JessieRayeBauer/563b9a6497307a4d49f317dfd895e210.js"></script>

<p>&nbsp;<br />Now let's visualize our missing data:</p>
<p><br />&nbsp;</p>
<script src="https://gist.github.com/JessieRayeBauer/63953836df4436f56fd8daa10f3f2baa.js"></script>
<p><br />&nbsp;</p>

![png](/images/Rplot02.png)
![png](/images/Rplot03.png)

<p><br />Alright, now time to impute!!</p>
<p><br />&nbsp;</p>
<script src="https://gist.github.com/JessieRayeBauer/e160d85a76326fa525b18336e72350a5.js"></script>

<p>&nbsp;Now, let's have a look at how the new imputed data (in red) looks compared to out original data (in blue):</p>
<p>&nbsp;</p>
<script src="https://gist.github.com/JessieRayeBauer/0fe9f9b04012244b2e61316e8ea2b3f2.js"></script>
<p>See the van Buren article for guidelines on how to measure goodness of fit for imputed&nbsp;data.</p>
<p>&nbsp;</p>

![png](/images/Rplot04.png)
![png](/images/Rplot05.png)
![png](/images/Rplot06.png)


<p>Finally- create a data frame from the imputed datasets, create your mediation model, extract and pool your parameters and check your final mediation model!!</p>
<script src="https://gist.github.com/JessieRayeBauer/281161dddfe9a48f2e5d1eb989195f26.js"></script>

<p><br />&nbsp;We did it!</p>
<p>For the full code, see documentation here on&nbsp;GitHub.&nbsp;Click <a href="https://github.com/JessieRayeBauer/MICE_R/blob/master/mice_med_in_R.ipynb" title="HERE">here</a> for a copy of the Jupyter Notebook file.&nbsp;</p>
<p>Happy Imputing!</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
  <font size="-2"><p>References:</p>
<ol>
<li>Bodner, T. E. (2008). What improves with increased missing data imputations? Structural Equation Modeling, 15(4), 651-675. doi:http://dx.doi.org/10.1080/10705510802339072</li>
<li>Enders, C. K. (2013), Dealing With Missing Data in Developmental Research. Child Dev Perspectives, 7, 27&ndash;31. doi:10.1111/cdep.12008</li>
<li>Little, R. J., &amp; Rubin, D. B. (2002). Single imputation methods. Statistical Analysis with Missing Data, Second Edition, 59-74. doi:http://dx.doi.org/10.1002/9781119013563</li>
<li>van Buuren, S., &amp; Groothuis-Oudshoorn, K. (2011). mice: Multivariate Imputation by Chained Equations in R. Journal of Statistical Sotware, 45(3), 1-67. doi:http://dx.doi.org/10.18637/jss.v045.i03</li>
<li>White, I. R., Royston, P., &amp; Wood, A. M. (2011). Multiple imputation using chained equations: issues and guidance for practice. Statistics in Medicine, 30(4), 377-399. doi:http://dx.doi.org/10.1002/sim.4067</li> 
</ol>
