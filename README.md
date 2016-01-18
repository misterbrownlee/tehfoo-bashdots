## my dotfiles

Just taking a tip from my peers and creating a repo for my bash shell tweaks.

Also, markdown cheat sheets, including a markdown cheat sheet for markdown!

Helpful things for setting up a new machine:
```
cd
git clone git@github.com:misterbrownlee/tehfoo-bashdots.git .configs
cd .configs
$DOTFILES_CLONE=`cwd`
cd ..
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

It's a bitch to symlink the Submlime text stuff, but here ya go:
```


Yay 4 magic.
