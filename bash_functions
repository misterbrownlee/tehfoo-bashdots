DOTFILES_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
echo "  loading functions..."

# ------------------------------------------------
# make a directory and change to it
#
function mkcd() {
    mkdir $1; cd $1
}


# ------------------------------------------------
# frag a named directory in all directories one level below this
# mostly used to reclaim disk space from node_modules madness
#
function fragFolder {
  # could just try find . -type d -maxdepth 2 -name "*$1*" -exec rm -ri {} \;
  # but this works and I like the echo messages better

  FRAG_TARGETS=`find . -type d -maxdepth 2 -name *$1*`

  if [ -z "$FRAG_TARGETS" ]
  then
    echo "No targets found."
  fi

  for target in $FRAG_TARGETS; do
    echo "fragging $target"
    rm -rf $target
  done;
}


# ------------------------------------------------
# create a file and open it
#
function rmd() {
  pandoc $1 | lynx -stdin
}

# ------------------------------------------------
# create a file and open it
#
function newfile() {
  touch $1; edit $1
}


# ------------------------------------------------
# create a directory and change to it
#
function mkcdir() {
  mkdir -p "$1"; cd "$1";
}


# ------------------------------------------------
# new terminal window at current location
#
function nwh() {
    osascript -e 'on run argv
        tell app "Terminal"
            do script "cd " & item 1 of argv
        end tell
    end run' `pwd`
}


# ------------------------------------------------
# make karma not try to find phantom.js
#
function togglePhantom() {
  if [ -z "$JENKINS_URL" ]
  then
    echo "setting JENKINS_URL=1"
    export JENKINS_URL=1
  else
    echo "unset JENKINS_URL"
    unset JENKINS_URL
  fi
}


# ------------------------------------------------
# freshen up an npm based repository
#
function minty() {
  say -v Zarvox "begin"
  if [[ -d node_modules ]]; then
    nn
  else
    say "no nuke for you"
  fi
  git up || { return; }
  ni || { return; }
  grunt || { return; }
}


# ------------------------------------------------
# clone a repo from github; args are [orgname] [repo]
#
function clone {
  echo " trying github clone of $1:$2"
  git clone git@github.com:$1/$2.git
}


# ------------------------------------------------
# clone from misterbrownlee
#
function meclone {
  echo " trying git clone of misterbrownlee:$1"
  clone misterbrownlee $1
}


# ------------------------------------------------
# clone a repo from Adobe github; args are [orgname] [repo]
#
function aclone {
  echo " trying git clone $ADOBE_GITHUB:$1/$2.git"
  git clone $ADOBE_GITHUB:$1/$2.git
}


# ------------------------------------------------
# clone a coralui component repo, because typing
#
function cclone() {
  echo " trying git clone $ADOBE_GITHUB:Coral/coralui-component-$1"
  git clone $ADOBE_GITHUB:Coral/coralui-component-$1 $1
}


# ------------------------------------------------
# tag a git repo with a floating tag
#
function tagfloat() {
  VERSION=$1
  FLOATING_TAG=$2
  git tag -d $FLOATING_TAG
  git push origin :refs/tags/$FLOATING_TAG || { return; }
  git tag -a $FLOATING_TAG $VERSION -m "@releng - $FLOATING_TAG floating tag based on $VERSION" || { return; }
  git push origin $FLOATING_TAG || { return; }
}


# ------------------------------------------------
# tag a git repo with a #pre floating tag
#
function tagpre() {
  VERSION=$1
  git tag -d pre
  git push origin :refs/tags/pre || { return; }
  git tag -a pre $VERSION -m "@releng - pre tag based on $VERSION" || { return; }
  git push origin pre || { return; }
}


# ------------------------------------------------
# prerelease and tag a git repo
#
function releasepre() {
  VERSION=$1
  # todo: warn if modules linked
  # todo: npm install latest
  git tag -d pre
  git checkout master || { return; }
  git pull origin master || { return; }
  git checkout prerelease || { return; }
  git pull origin prerelease || { return; }
  git merge master -m '@releng - merge master into prerelease' || { return; }
  npm i || { return; }
  grunt release || { return; } # todo: pass version here
  tagpre $VERSION || { return; }
  git checkout master
}


# ------------------------------------------------
# delete a tag, on earth as it is in heaven, ahhhhh mens yeah
#
function rmtag() {
  git tag -d $1
  git push origin :refs/tags/$1
}

function cdl() {
  cd "$@" && ll && printf "Now in \033[0;35m$PWD\n";
}


function checkNvm() {
  if [[ -f .nvmrc && -r .nvmrc ]]; then
    nvm use
  elif [[ $(nvm version) != $(nvm version default)  ]]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}


