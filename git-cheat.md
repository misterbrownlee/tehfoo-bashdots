[alias]
```
  a = add
  aa = !git add -A
  ac = !git add -A && git commit -m
  acl = !git clone git@git.corp.adobe.com:$1/$2
  ai = !git add -i
  b = branch
  ba = !git branch -a
  c = commit
  ca = !git commit -a
  cam = !git commit --amend
  cleanup = !git remote prune origin && git gc && git clean -xdf
  cm = !git commit -m
  co = checkout
  cob = !git checkout -b
  cv = !git commit -v
  delrm = !git push origin --delete $1
  diff = !git diff --diff-filter=ACMRTUXB
  done = !git fetch && git rebase origin/master && git checkout master && git merge @{-1}
  fm = !git fetch origin master
  nuke = !git clean -xdf
  p = push
  pl = pull
  plm = !git pull origin master
  pm = !git push origin master
  r = reset
  rollback =  !rm $1 && git checkout $1
  rsm = !git reset --soft master
  rsom = !git reset --soft master
  st = status
  unstage = !git reset HEAD
  up = !git fetch origin && git rebase origin/master
```
