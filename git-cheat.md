# ALIASES

# git
> ga `git add`  
> gc `git commit`
> gst `git status`
> gpull `git pull`
> gpush `git push`
> gdiff `git diff --diff-filter ACMRTUXB`
> gdiffm `git diff master`
> gmerge `git mergetool`
> nonpush `git-notpushed`

> gca `git commit -a`
> gcv `git commit -v`
> gcva `git commit -v -a`
> gc `git commit`
> gcam `git commit --amend`

> gco `git checkout`
> gb `git branch`
> gbranch `git branch -a`

> ga `git add`
> gaa `git add -A`
> gai `git add -i`

> unstage `git reset HEAD`
> rollback `grb`

> eglobal `edit .git/config`
> gl `git log`

> gsu `git submodule foreach git pull`
> gsp `git submodule foreach git push`
> gsa `git submodule foreach git add -A`

# prune remote branches
> grp `git remote prune origin`

# clone
> gcl `git clone $1`

# track remote branch
> gtr `git checkout -b $1 origin/$1`

# delete remote branch
> grd `git push origin :$1`


# magically commit 
> *commit all pending changes, args are commit message*
> gcm  `git commit -v -m "$*"`

# magically add all 
> *add and commit pending changes*
> gacm `git add -A && git commit -v -a -m "$*"`


# setup a tracking branch 
> *pass in [remote] [branch_name]*
> gtrack `git branch --track $2 $1/$2 && git checkout $2`

# roll back changes to a file
>  grb `rm $1 && git checkout $1`

# git-cheat  
> *burp this cheatsheet so I can peep it*
> git-cheat `open -a /Applications/Google\ Chrome.app $DOTFILES_PATH/git-cheat.md`


# navigations
> cdcode `cd ~/Documents/code`
> cdtools `cd ~/Documents/code/tools`
> cdxd `cd ~/Documents/code/xd`
> cdwork `cd ~/Documents/code/workspace`

# softwares
> chrome `open -a /Applications/Google\ Chrome.app`
> edit `subl`

# commands 
> mkcdir `mkdir $1; cd $1`



