#!/user/bin/ bash

#We recommend the user to use this code after doing push

echo "Start"
#Remove remote branch
git push origin --delete gh-pages

#Remove local branch
git branch gh-pages -d

#Create local branch
git checkout -b gh-pages

#Save the changes
git add --all

#Commit
git commit -m "deploy with bash"

#Create remote branch
git push --set-upstream origin gh-pages
echo "Finish"

#run this code
#bash .deploy.sh
