# git
alias gst='git status'

alias gco='git checkout'
alias gb='git branch'
alias gbranch='git branch -a'

alias ga='git add'
alias gaa='git add -A'
alias gai='git add -i'

alias gc='git commit'
alias gca='git commit -a'
alias gcv='git commit -v'
alias gcva='git commit -v -a'
alias gc='git commit'
alias gcam='git commit --amend'

alias gpull='git pull'
alias gplm='git pull origin master'
alias gfm='git fetch origin master'
alias gpush='git push'
alias gpm='git push origin master'

alias gdiff='git diff --diff-filter=ACMRTUXB'
alias gdiffm='git diff master'

alias gmerge='git mergetool'
alias nonpush='git-notpushed'

alias unstage='git reset HEAD'
alias rollback='grb'
alias gnuke='git clean -xdf'
alias gclean='git clean'

alias eglobal='edit .git/config'
alias gl='git log'
alias stashlist='git stash list'

alias gsu='git submodule foreach git pull'
alias gsp='git submodule foreach git push'
alias gsa='git submodule foreach git add -A'

# prune remote branches
alias grp='git remote prune origin'
alias grprune='grp'

## fancy git functions

# clone
function gcl() {
  git clone $1
}

# track remote branch
function gtr() {
  git checkout -b $1 origin/$1
}

# delete remote branch
function gbdelrem() {
  git push origin :$1
}

# magically commit all pending changes 
# args are commit message
function gcm() {
    git commit -v -m "$*"
}

# magically add all and commit pending changes
function gcA() {
    git add -A && git commit -v -a -m "$*"
}

# setup a tracking branch from [remote] [branch_name]
function gtrack() {
  git branch --track $2 $1/$2 && git checkout $2
}

# roll back changes to a file
function grb() {
  rm $1
  git checkout $1
}