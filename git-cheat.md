[alias]
```
  a = add
  aa = !git add -A
  ac = !git add -A && git commit -m
  acl = !git clone git@git.corp.adobe.com:$1/$2
  ai = !git add -i
  b = branch
  ba = !git branch -a
  bd =  !git branch -d
  bdr = !git push origin :
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
  master = !git co master
  nb = !git checkout -b
  nuke = !git clean -xdf
  p = push
  pl = pull
  plm = !git pull origin master
  pm = !git push origin master
  prune = !git remote prune origin
  r = reset
  rollback =  !rm $1 && git checkout $1
  rsm = !git reset --soft master
  rsom = !git reset --soft master
  rup =  !git remote update
  rupru = !git remote update -p
  st = status --short
  stl = status
  t = tag
  undo =checkout --
  unstage = !git reset HEAD
  upbase = !git remote update -p && git rebase origin/master
  upff = !git remote update -p && git merge --ff-only origin/master
  up = !git fetch && git co master && git merge origin/master && git remote prune origin
  wayback = !git undo .
  
```
