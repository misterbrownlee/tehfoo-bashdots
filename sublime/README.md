# Hi, me.  It's me.

I'm here remind you about how to symlink these so your SublimeText install picks up all your cozy feel good mods.

```
cheezburgr-brownlee: ~ $cd ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/User/
cheezburgr-brownlee: User $ll
total 48
drwxr-xr-x   7 brownlee  staff   238B Apr  3 10:20 .
drwxr-xr-x  51 brownlee  staff   1.7K Aug 22 10:53 ..
-rw-r--r--   1 brownlee  staff   6.0K Apr  3 10:20 .DS_Store
-rw-r--r--   1 brownlee  staff     4B Apr  3 10:20 Default (Linux).sublime-keymap
-rw-r--r--   1 brownlee  staff     4B Apr  3 10:20 Default (OSX).sublime-keymap
-rw-r--r--   1 brownlee  staff     4B Apr  3 10:20 Default (Windows).sublime-keymap
-rw-r--r--   1 brownlee  staff   144B Apr  3 10:20 Preferences.sublime-settings
cheezburgr-brownlee: User $mv Preferences.sublime-settings gtfo.original.settings
cheezburgr-brownlee: User $mv Default\ \(OSX\).sublime-keymap gtfo.original.keymap
cheezburgr-brownlee: User $ln -s ~/bin/bashprofile.txt 
.DS_Store                         gtfo.original.keymap
Default (Linux).sublime-keymap    gtfo.original.settings
Default (Windows).sublime-keymap  
cheezburgr-brownlee: User $ln -s ~/bin/dotfiles/sublime/Preferences.sublime-settings Preferences.sublime-settings
cheezburgr-brownlee: User $ln -s ~/bin/dotfiles/sublime/Default\ \(OSX\).sublime-keymap Default\ \(OSX\).sublime-keymap

```

Have fun!
