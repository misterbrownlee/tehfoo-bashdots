# Ya-SoMa-CheeShe
###### (Yet Another Stolen Markdown Cheat Sheet)

I started to write my own version of this, then got lazy. Instead, I poached some markdown from the [markdown-here](https://github.com/adam-p/markdown-here) project, which has a great cheat-sheet in their [wiki](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).  For more complete info, see [John Gruber's original spec](http://daringfireball.net/projects/markdown/) and the [Github-flavored Markdown info page](http://github.github.com/github-flavored-markdown/).

Actually, kind of broken right now?

# Table of Contents
[Headers](#headers)  
[Emphasis](#emphasis)  
[Lists](#lists)  
[Links](#links)  
[Images](#images)  
[Code and Syntax Highlighting](#code)  
[Blockquotes](#blockquotes)  
[Inline HTML](#html)  
[Horizontal Rule](#hr)  
[Line Breaks](#lines)  

<div id="headers">&nbsp;</div>  

## Headers

```no-highlight
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------
```

# H1
## H2
### H3
#### H4
##### H5
###### H6

Alternatively, for H1 and H2, an underline-ish style:

Alt-H1
======

Alt-H2
------

<div id="emphasis">&nbsp;</div> 
## Emphasis

```no-highlight
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.
```

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

<a name="lists"/>
## Lists

```no-highlight
1. First ordered list item
2. Another item
  * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.  
   
   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses
```

1. First ordered list item
2. Another item
  * Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
  1. Ordered sub-list
4. And another item.  
   
   Some text that should be aligned with the above item.

* Unordered list can use asterisks
- Or minuses
+ Or pluses

<a name="links"/>
## Links

There are two ways to create links.

```no-highlight
[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself][]

Some text to show that the reference links can follow later.
```
[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

[I'm an inline-style link](https://www.google.com)

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself][]

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

<a name="images"/>
## Images

```no-highlight
Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"
```

Here's our logo (hover to see the title text):

Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

<a name="code"/>
## Code and Syntax Highlighting

Code blocks are part of the Markdown spec, but syntax highlighting isn't. However, many renderers -- like Github's and *Markdown Here* -- support syntax highlighting. *Markdown Here* supports highlighting for dozens of languages (and not-really-languages, like diffs and HTTP headers); to see the complete list, and how to write the language names, see the [highlight.js demo page](http://softwaremaniacs.org/media/soft/highlight/test.html).

```no-highlight
Inline `code` has `back-ticks around` it.
```

Inline `code` has `back-ticks around` it.

Blocks of code are either fenced by lines with three back-ticks <code>```</code>, or are indented with four spaces. I recommend only using the fenced code blocks -- they're easier and only they support syntax highlighting.

```no-highlight
 ```javascript
 var s = "JavaScript syntax highlighting";
 alert(s);
 ```
 
 ```python
 s = "Python syntax highlighting"
 print s
 ```
 
 ```
 No language indicated, so no syntax highlighting. 
 But let's throw in a <b>tag</b>.
 ```
```

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting in Markdown Here (varies on Github). 
But let's throw in a <b>tag</b>.
```

(Github Wiki pages don't seem to support syntax highlighting, so the above won't be colourful (the strings are not red, for example). Try it out in a *Markdown Here* email or a Github Markdown README or Github Issue -- you can preview a new Issue without submitting it.)

Again, to see what languages are available for highlighting, and how to write those language names, see the [highlight.js demo page](http://softwaremaniacs.org/media/soft/highlight/test.html).

<a name="blockquotes"/>
## Blockquotes

```no-highlight
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 
```

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

<a name="html"/>
## Inline HTML

You can also use raw HTML in your Markdown, and it'll mostly work pretty well. Here are a couple of common examples:

```no-highlight
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

<table>
  <tr>
    <th></th>
    <th>Tables</th>
    <th>Are</th>
    <th>Cool</th>
  </tr>
  <tr>
    <th>Zebra</th>
    <td>Stripes</td>
    <td>Are</td>
    <td>Pretty</td>
  </tr>
  <tr>
    <th>Here</th>
    <td>Is</td>
    <td>Another</td>
    <td>Row</td>
  </tr>
</table>
```

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

<table>
  <tr>
    <th></th>
    <th>Tables</th>
    <th>Are</th>
    <th>Cool</th>
  </tr>
  <tr>
    <th>Zebra</th>
    <td>Stripes</td>
    <td>Are</td>
    <td>Pretty</td>
  </tr>
  <tr>
    <th>Here</th>
    <td>Is</td>
    <td>Another</td>
    <td>Row</td>
  </tr>
</table>

Github-flavored Markdown supports a special table syntax, but *Markdown Here* does not support it yet. [There's an issue for it.](https://github.com/adam-p/markdown-here/issues/13)

<a name="hr"/>
## Horizontal Rule

```
Three or more...

---

Hyphens

***

Asterisks

___

Underscores
```

Three or more...

---

Hyphens

***

Asterisks

___

Underscores

<a name="lines"/>
## Line Breaks

My basic recommendation for learning how line breaks work is to experiment and discover -- hit &lt;Enter&gt; once, then hit it twice, see what happens. You'll soon learn to get what you want. "Markdown Toggle" is your friend. 

Here are some things to try out:

```
With only a single newline, this line and
this line will be a *single line*.

But this one is separated by two newlines and so will be a *separate paragraph*.

This line has two spaces at the end (hard for you to see, but trust me!).  
So this is a separate line in the *same paragraph*.
```

With only a single newline, this line and
this line will be a *single line*.

But this one is separated by two newlines and so will be a *separate paragraph*.

This line has two spaces at the end (hard for you to see, but trust me!).  
So this is a separate line in the *same paragraph*.