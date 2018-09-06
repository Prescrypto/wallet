#!/user/bin/ bash

echo "Start"

# Define the variables Day and Hour
Day=`date +"%d-%m-%Y"`
Hour=`date +"%H:%M"`

folder="$Day-$Hour"

# Get your branch name 
branch_name="$(git branch | grep \* | cut -d ' ' -f2)" || branch_name="(unnamed branch)"
echo "you are now in: $branch_name"

# Move all files to file temporal   
cp -r ./ ./../$folder

# Remove file .git
rm -rf ./../$folder/.git
rm -rf ./../$folder/deploy.sh

#check if gh-pages exists in remote
git fetch
git branch -d gh-pages
gh_pages_exists="$(git branch --list gh-pages)"
echo $gh_pages_exists
if [ "$gh_pages_exists" = "" ]; then
    #if it doesnt exists then create it
    echo "gh-pages doesnt exists"
    git branch gh-pages
    git checkout gh-pages
else
    echo "gh-pages branch already exists."
    git checkout gh-pages 
    git pull
    
fi

#check if it is the master branch
if [ "$branch_name" = "master" ]; then
	echo "this is master branch"
	cp -r ./../$folder/* ./

else

	#check if there is a folder with the name of the current branch if it does, remove it
	if [ -d "deploy/$branch_name" ]; then
	    echo "this directory already exists"
	    cd deploy
	    rm -rf $branch_name/*
	    cd ../
	else
	    echo "this directory doesnt exists"
	    # Create and Move to folder deploy   
	    mkdir deploy
	    cd deploy
	    mkdir $branch_name
	    cd ../
	fi

	#copy all the temp folder to the gh-pages folder
	cp -r ./../$folder/* deploy/$branch_name

fi

#Remove folder auxiliar
rm -rf ./../$folder
# Add all files
git add --all

# Make commit
git commit -m "Deploy Branch"

# Git push 
git push || git push --set-upstream origin gh-pages

#get back to the original branch
git checkout $branch_name

echo "finish deployment"
