## my dotfiles

Just taking a tip from my peers and creating a repo for my bash shell tweaks.

Also, markdown cheat sheets, including a markdown cheat sheet for markdown!

Helpful things for setting up a new machine:
```
git clone git@github.com:tehfoo/bashdots.git
cd bashdots
$DOTFILES_CLONE=`cwd`
cd ~
ln -s $DOTFILES_CLONE/git-config .gitconfig
ln -s $DOTFILES_CLONE/gitignore_global .gitignore_global

# ADD THIS TO .bashrc
source $DOTFILES_CLONE/bash_parent

# THIS IS .bash_profile
if [ -f ~/.bashrc ]; 
then
   source ~/.bashrc
fi
```

Yay 4 magic.
