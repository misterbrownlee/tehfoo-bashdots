# Hi, me.  It's yourself.

I'm here remind you about how to symlink these so your SublimeText install picks up all your cozy feel good mods.  

Most of this crap goes in:  

    /Users/brownlee/Library/Application Support/Sublime Text 3/Packages/User

Easy to make these mappings copypasta:
```
cd .configs
$DOTFILES_CLONE=`cwd`
cd /Users/brownlee/Library/Application\ Support/Sublime\ Text\ 3/Packages/User
ln -s $DOTFILES_CLONE/sublime/WebExPert.tmTheme ./WebExPert.tmTheme
ln -s $DOTFILES_CLONE/sublime/Default\ \(OSX\).sublime-keymap ./Default\ \(OSX\).sublime-keymap
mv Preferences.sublime-settings original.Preferences.sublime-settings
ln -s $DOTFILES_CLONE/sublime/Preferences.sublime-settings ./Preferences.sublime-settings


It will look like this when done I think:
```
brownlee@brownlee-OSX: ~  
➥ cd /Users/brownlee/Library/Application\ Support/Sublime\ Text\ 3/Packages/User
brownlee@brownlee-OSX: User  
➥ ll
total 32
drwx------  6 brownlee  staff   204B Jan 18 13:01 .
drwx------  3 brownlee  staff   102B Jan 18 11:25 ..
lrwxr-xr-x  1 brownlee  staff    61B Jan 18 12:58 Default (OSX).sublime-keymap -> /Users/brownlee/.configs/sublime/Default (OSX).sublime-keymap
lrwxr-xr-x  1 brownlee  staff    61B Jan 18 12:55 Preferences.sublime-settings -> /Users/brownlee/.configs/sublime/Preferences.sublime-settings
lrwxr-xr-x  1 brownlee  staff    50B Jan 18 13:01 WebExPert.tmTheme -> /Users/brownlee/.configs/sublime/WebExPert.tmTheme
-rw-r--r--  1 brownlee  staff    21B Jan 18 11:48 orig.Preferences.sublime-settings
```

Package control install these things also:
- Bracket Highlighter
- Editor Config
- Git Gutter
- Hipster Ipusm
- Jade Support
- Markdown Preview
- Mocha Support
- Modific
- Pretty JSON
- Sass support
- Side Bar Enhancements
- String Encode
- Stylus Support
- Trailing Spaces
- Word Count

Have fun!
