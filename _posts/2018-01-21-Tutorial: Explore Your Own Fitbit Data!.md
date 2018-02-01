---

layout: default
title: "Tutorial: Explore Your Own Fitbit Data!"
date: 2018-01-21
---
As a new Fitbit owner (Dec. 2017), previous collegiate athlete, and fitness lover, I was incredibly curious about my own Fitbit data! Here is an initial peak at my data.

The goal of this project was to practice:
1. acquiring data from an API 
2. working with new types of data formats (e.g., json)
3. visualizations
4. basic statistics in Python.

In order to get my Fitbit data, I first had to set up a [Fitbit API](https://dev.fitbit.com/apps/new). Then, I ran a separate script - available [here](https://github.com/JessieRayeBauer/Fitbit/blob/master/Pull_fitbit_data.md).


The general outline of this post is as follows:
 1. Import or install necessary libraries
 2. Read in and visualize data sets (heart rate, sleep, steps)
 3. Analyses!
 4. Next steps
 

**1. Import or install necessary libraries**

```python
#!pip install fitbit
#!pip install -r requirements/base.txt
#!pip install -r requirements/dev.txt
#!pip install -r requirements/test.txt
from time import sleep
import fitbit
import cherrypy
import requests
import json
import datetime
import scipy.stats
import pandas as pd
import numpy as np

# plotting
import matplotlib
from matplotlib import pyplot as plt
import seaborn as sns
%matplotlib inline
```

Let's read in one file with heartrate data to check the format and see what the data looks like.

~~~~~~ python
with open('heartrate/HR2017-12-23.json') as f:
    hr_dat_sample = json.loads(f.read())
#hr_dat_sample
~~~~~~~~~~~~

We ended up with crazy town output... let's parse the .json file so humans can read it!


```python
parsed_json_hr_samp = json.loads(hr_dat_sample)
#parsed_json_hr_samp
```

```python
list(parsed_json_hr_samp['activities-heart-intraday'].keys())
```
    [u'datasetType', u'datasetInterval', u'dataset']



Much better. Now we can see the headings inside 'activities-heart-intraday'. 

**2. Read in and visualize data**

Heart Rate

```python
dates = pd.date_range('2017-12-23', '2018-01-25')
hrval = []

for date in dates:
    fname = 'heartrate/HR' + date.strftime('%Y-%m-%d') + '.json'
    with open(fname) as f:
        date_data = json.loads(f.read())
        
        data = pd.read_json(date_data, typ='series')
        hrval.append(data['activities-heart-intraday']['dataset'][1])

HR_df = pd.DataFrame(hrval,index = dates)
HR_df.columns = ['time', 'bpm']
HR_df.head()
```
![png](/images/table1.png)


This should be where the heart rate statistics are stored. Let's check.


```python
stats = data['activities-heart-intraday']['dataset']
HR=pd.DataFrame(stats)
HR.head()
```
![png](/images/table2.png)

Hooray! Alas, they are here. Let's rename the columns and plot data just to have a look.


```python
HR.columns = ['time', 'bpm']
HR.plot(color = "firebrick")
plt.ylabel('Heart Rate');
```


![png](/images/output_16_0.png)


That's a lot of data... it's my heartrate for every few seconds for an entire day. 

Hmmmm... it looks like I went for a run or swim at some point!

My researcher instincts are coming out now... Must check for outliers and see the general range of heartrate values!


```python
HR.describe()
```
![png](/images/table3.png)



**Sleep Data**

Let's repeat the data structure exploration that we did with heartrate for sleep! This code should read in one sleep file, should get the highest level keys: 'summary' and 'sleep'



```python
with open('sleep/sleep2017-12-23.json') as f:
    sleepdat = json.loads(f.read())
sleepdata = pd.read_json(sleepdat, typ='series')
sleepdata
```

    sleep      [{u'logId': 16665472783, u'dateOfSleep': u'201...
    summary    {u'totalTimeInBed': 547, u'stages': {u'light':...
    dtype: object




```python
parsed_json = json.loads(sleepdat)
#print(json.dumps(parsed_json))
```

Let's parse this guy.


```python
list(parsed_json['sleep'][0].keys())
```

    [u'logId',
     u'dateOfSleep',
     u'minutesToFallAsleep',
     u'awakeningsCount',
     u'minutesAwake',
     u'timeInBed',
     u'minutesAsleep',
     u'awakeDuration',
     u'efficiency',
     u'isMainSleep',
     u'startTime',
     u'restlessCount',
     u'duration',
     u'restlessDuration',
     u'minuteData',
     u'endTime',
     u'awakeCount',
     u'minutesAfterWakeup']



Now we are ready to read in all the sleep files. I then concatonated the files using the .append command. Finally, I convert the data frame into a pandas data frame using the pd.DataFrame command. Boom.


```python
sleepy = []
for date in dates:
    fname = 'sleep/sleep' + date.strftime('%Y-%m-%d') + '.json'
    with open(fname) as f:
        date_data_sleep = json.loads(f.read())
        datsleep = pd.read_json(date_data_sleep, typ='series')
        sleepy.append(datsleep['summary']['totalTimeInBed'])

sleepdf = pd.DataFrame(sleepy,index = dates) #use the date as the column row names
sleepdf.columns = ['hours'] #rename column
sleepdf['hours'] = sleepdf['hours']/60 # Turn minutes to hours
```

Time to see the beautiful new df!


```python
sleepdf.head()
```

![png](/images/table4.png)


And again, check for outliers just in case. You never know. But, it all looks good.


```python
sleepdf.describe()
```
![png](/images/table5.png)



Plot it out in a nice simple graph. I should probably stick to a better sleep schedule.


```python
sleepdf['hours'].plot(color = "mediumseagreen")
plt.title('Hours of Sleep (12.23.17-1.25.18)')
plt.ylabel('Hours')
plt.show()
```


![png](/images/Fitbitexplore_32_0.png)


Let's plot the sleep data another way...how about a distribution?

By the way, what do you call a haunted distrubution?  A paranormal distribution. Ha! Sorry guys. 


```python
sns.distplot(sleepdf['hours'], color="mediumseagreen")
plt.title("My Sleep Distribution")
plt.xlabel("Hours")
plt.show()
```


![png](/images/Fitbitexplore_34_0.png)


Add column and labels for day of week, just as before.


```python
sleepdf["day_of_week"] = sleepdf.index.weekday
days = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 
        5: "Saturday", 6: "Sunday"}
sleepdf["day_name"] = sleepdf["day_of_week"].apply(lambda x: days[x])
sleepdf.head()
```


![png](/images/table6.png)



For kicks, we should probably check and officially see if we have an even amount of data per day (in case I forgot to put it on one night or the battery died). 

This is important if we want to trust the accuracy of our analyses related to days of the week! According to the plot, it's all pretty even, except for Friday. This is because I imported data before the 5th Friday.


```python
# Make a Bar Plot 
sns.countplot(x='day_name', data=sleepdf, palette = "Set2")
plt.xticks(rotation=45)
plt.xlabel("")
plt.show()
```


![png](/images/Fitbitexplore_39_0.png)


How does my sleep vary from day to day? Looks like Sunday is really variable.


```python
sns.swarmplot(x='day_name', y='hours', data=sleepdf,  palette = "Set2")
plt.xticks(rotation=45)
plt.title("Sleep Distribution Over the Week")
plt.ylabel("Hours")
plt.xlabel("")
plt.show()
```


![png](/images/Fitbitexplore_41_0.png)


For kicks, we should probably check and officially see if we have an even amount of data per day (in case I forgot to put it on one night or the battery died). This is important if we want to trust the accuracy of our analyses related to days of the week!

Another view- violin style!


```python
sns.violinplot(x='day_name',
               y='hours', 
               data=sleepdf, 
               inner=None, palette = 'Set2' ) # Remove the bars inside the violins

## plot the dots we see above over the violin plot.
sns.swarmplot(x='day_name',
               y='hours', 
              data=sleepdf, 
              color='k', 
              alpha=0.7)
 
# Set title with matplotlib
plt.title('Sleep by Day')
plt.xticks(rotation=45)
plt.show()
```


![png](/images/Fitbitexplore_44_0.png)


Okay, last sleep plot visual, for now. The graph below is more typical of something I would encounter in academia, and it also shows the standard errors of my sleep during each day. 


```python
sns.boxplot(x = 'day_name', y = 'hours', data = sleepdf, palette = 'Set2')
plt.title('Hours of Sleep by Day')
plt.xticks(rotation=45)
plt.xlabel("") 
plt.ylabel("")
plt.show()
```


![png](/images/Fitbitexplore_46_0.png)


**Step data**

Read it in. And check structure of .json file, it's a mystery. 


```python
with open('steps/step2018-01-13.json') as f:
    step_data = json.loads(f.read())
stepsdata = pd.read_json(step_data, typ='series')
stepsdata
```




    activities-steps    [{u'value': u'12721', u'dateTime': u'2018-01-1...
    dtype: object




```python
parsed_json = json.loads(step_data)
#print(json.dumps(parsed_json))

```

Get higher level key name(s).


```python
list(parsed_json.keys())
```




    [u'activities-steps']




```python
dates = pd.date_range('2017-12-23', '2018-01-25')
steppers = []
for date in dates:
    fname = 'steps/step' + date.strftime('%Y-%m-%d') + '.json'
    with open(fname) as f:
        date_data = json.loads(f.read())
        
        stepsdata = pd.read_json(date_data, typ='series')
        steppers.append(stepsdata['activities-steps'][0]) # the zero indexes the first value

stepsdf = pd.DataFrame(steppers,index = dates) # use date as row index
stepsdf.columns = ['date','steps'] # rename columns
```


```python
stepsdf.head()
```

![png](/images/table7.png)


Add column for the day of week, just as before. 


```python
stepsdf["day_of_week"] = stepsdf.index.weekday
stepsdf["day_name"] = stepsdf["day_of_week"].apply(lambda x: days[x])
#Have a look!
stepsdf.head()
```

![png](/images/table8.png)


To perform any analyses or plot data, we need to convert steps column into a numeric type. Otherwise we get errors. We don't like errors.


```python
stepsdf['steps'] = pd.to_numeric(stepsdf['steps'])
stepsdf.info()
```

    <class 'pandas.core.frame.DataFrame'>
    DatetimeIndex: 34 entries, 2017-12-23 to 2018-01-25
    Freq: D
    Data columns (total 4 columns):
    date           34 non-null object
    steps          34 non-null int64
    day_of_week    34 non-null int64
    day_name       34 non-null object
    dtypes: int64(2), object(2)
    memory usage: 1.3+ KB


Now it's numeric! Anything is pos-iiii-ble!

Anywho... let's see my step distribution.


```python
sns.set_style("ticks")
sns.distplot(stepsdf['steps'], color = 'steelblue')
plt.title("Step Distribution")
plt.xlabel("Steps") 
plt.show()
```


![png](/images/Fitbitexplore_60_0.png)


Violin time.

 I shall call it: "Friday: run or couch?"


```python
sns.violinplot(x='day_name',
               y='steps', 
               data=stepsdf, 
               inner=None, palette="Set3" ) # Remove the bars inside the violins
            
## Overlay dots onto violins.
sns.swarmplot(x='day_name',
               y='steps', 
              data=stepsdf, 
              color='k',  #black dots
              alpha = 0.5)
plt.title('Steps by Day')
plt.xticks(rotation=45)
plt.xlabel("") 
plt.ylabel("")
plt.show()
```


![png](/images/Fitbitexplore_63_0.png)


Boxplot - bam.


```python
sns.boxplot(x = 'day_name', y = 'steps', data = stepsdf, palette="Set3")
plt.title('Steps by Day')
plt.xticks(rotation=45)
plt.xlabel("") 
plt.ylabel("")
plt.show()
```


![png](/images/Fitbitexplore_65_0.png)



```python
## Put hours into the right format
import statsmodels.api as sm
import statsmodels.formula.api as smf
from pandas.core import datetools
stepsdf['hours'] = sleepdf['hours'].values
```

**3. Analyses**

Linear regression models

**Question 1: Am I more active on days after I get more sleep?**

I am operationalizing active to mean more steps per day.

In the model below, I am predicting my steps from the hours of sleep I got the night before. I am using an ordinary least squares regression model. Below is the code for the model, fitting the model, and displaying the results. 

First, we create variable for the previous night's sleep and align it properly.


```python
stepsdf["hours_prev"] = stepsdf.shift(1).hours
stepsdf.head()
```

![png](/images/table9.png)

```python
mod1 = smf.ols(formula = "steps ~ hours_prev", data = stepsdf).fit()
mod1.summary().tables[1]
```
![png](/images/table10.png)



**Results:**

So, we can see from the regression table that how many hours I slept the previous night ('hours_prev') does not predict the amount of steps I take the next day. This might be for a variety of reasons. First, I don't have a lot of data yet! I have only used my Fitbit for a month. Second, I am a graduate student, and my sleep is incredibly variable. Third- I love to be active! Even if I am tired, a run usually makes me feel better. Long story short is, we need more data!


```python
sns.regplot(x = stepsdf.steps, y = stepsdf.hours_prev, color = 'steelblue')
plt.xlabel("Daily Steps")
plt.ylabel("Hours of Sleep")
plt.title("Does Sleep Amount Predict Activity Level?")
plt.show()
```


![png](/images/Fitbitexplore_72_0.png)


That flat line shows that there is no linear relationship- it's flat as a pancake, which sounds amazing right now.

**Linear regression model  part 2**

 **Question 2: Do I sleep need more sleep the night after I don't get a lot of sleep? In other words, am I building up a sleep deficit?**

In the model below, I am predicting the difference in amount of sleep I get from the hours of sleep I got the night before. I am using an ordinary least squares regression model. Below is the code for the model, fitting the model, and displaying the results. 

But first, we need to create a delta sleep variable to capture the difference in amount of sleep I got from the night before. 


```python
stepsdf["hours_diff"] = stepsdf.hours - stepsdf.hours_prev
stepsdf.head()
```


![png](/images/table11.png)



```python
mod2 = smf.ols(formula = 'hours_diff ~ hours_prev', data = stepsdf).fit()
mod2.summary().tables[1]
```


![png](/images/table12.png)



**Results Question 2:**

The regression table shows that how many hours I slept the previous night ('hours_prev') negatively predicts the difference in amount of sleep I get the next day. Put more simply, this means that if I get a good night's sleep, the next night, I don't need as much sleep. Conversely, if I don't get a lot of sleep, the next night, I make up for it by sleeping longer.

To make this finding easier to digest, let us visualize the relationship!


```python
# Plot how much more I slept each night vs. amount slept night before
sns.regplot(x = stepsdf.hours_prev, y = stepsdf.hours_diff, color = "mediumseagreen")
plt.title("Sleep Deficit?")
plt.ylabel("Difference in Hours")
plt.xlabel("Hours of Sleep")
plt.show()
```


![png](/images/Fitbitexplore_78_0.png)


Poof! Here is that negtative linear relationship we saw in our regression table.

**4. Next steps**

In sum, we have imported data using Fitbit's API, worked with .json data, visualized our data, and we ran two linear regressions. We found that my activity level is dependent from how much sleep I get and that I built up a sleep deficit over time. Phew!! 

What I would like to do next is collect more data! I would also like to create some interactive visuals and run some more sophisticated models on my data. Finally, I would like to explore my heart rate more. The closer I get to defending my dissertation, the higher it seems to get. Should be fun to test if that is statistically significant! :) 

If you have any suggestions on how I can improve, sources that may help improve my code, or comments/questions, please let me know! I am using this space to share and learn. 

Thanks!!

## Resources

+ [Fitbit API](https://dev.fitbit.com/apps/new)
+ [A Fun Read - Paul's Geek Dad Blog ](http://pdwhomeautomation.blogspot.co.uk/2016/01/fitbit-api-access-using-oauth20-and.html)
+ [Brian Caffey: Including Jupyter Notebooks in Jekyll blog posts](https://briancaffey.github.io/2016/03/14/ipynb-with-jekyll.html)

  
 
<body>
<table class="gridtable">
<tr>
<th>Info Header 1</th><th>Info Header 2</th><th>Info Header 3</th>
</tr>
<tr>
<td>Text 1A</td><td>Text 1B</td><td>Text 1C</td>
</tr>
<tr>
<td>Text 2A</td><td>Text 2B</td><td>Text 2C</td>
</tr>
</table>
</body>


