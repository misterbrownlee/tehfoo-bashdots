#!/usr/bin/env 
echo "  loading greeting..."

hour=$(date +"%H")
 
# if it is midnight to midafternoon will say G'morning
if [ $hour -ge 0 -a $hour -lt 12 ]
then
  greet="hoit, $USER"
# if it is midafternoon to evening ( before 6 pm) will say G'noon
elif [ $hour -ge 12 -a $hour -lt 18 ] 
then
  greet="sup, $USER?"
else # it is good evening till midnight
  greet="good evening, $USER"
fi

# COWS=(/usr/local/Cellar/cowsay/3.03/share/cows/*)
# MAX_COW=`ls /usr/local/Cellar/cowsay/3.03/share/cows | wc -l`
# COW_NUM=$RANDOM;
# COW_NUM=$[ $COW_NUM % $MAX_COW ]
 
# display greet
echo -e "\033[0;32m"
echo ---------------------------------------------------------------
# echo -e "\n\n\n"

# cowsay -f "${COWS[COW_NUM]}" $greet
# fortune | cowsay | toilet --gay -f term
echo "$greet"
echo "LET'S DO THIS"
echo ---------------------------------------------------------------
