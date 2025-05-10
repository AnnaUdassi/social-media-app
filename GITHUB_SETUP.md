# GitHub Setup Instructions

Follow these steps to finish setting up your GitHub repository:

## 1. Create a new GitHub repository

1. Go to [GitHub](https://github.com/) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Enter "socialmedia" as the repository name
4. Choose whether to make it public or private
5. Do NOT initialize with a README, .gitignore, or license (since we've already created these files locally)
6. Click "Create repository"

## 2. Push your code to GitHub

After creating the repository, GitHub will show instructions. Follow the section titled "…or push an existing repository from the command line".

Replace "YOUR-USERNAME" with your actual GitHub username and run:

```bash
# If you haven't set up the remote yet:
git remote add origin https://github.com/annaudassi1/socialmedia.git

# Push your code:
git push -u origin main
```

## 3. Verify your repository

1. Go to `https://github.com/annaudassi1/socialmedia`
2. You should see all your files there
3. Update the README.md file to include your actual GitHub username

## 4. Future pushes

After the initial setup, you can push changes with:

```bash
git add .
git commit -m "Description of your changes"
git push
```

## 5. GitHub Pages Setup (Optional)

To host your app on GitHub Pages:

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "GitHub Pages"
4. Select the branch you want to deploy from (usually "main")
5. Click "Save"

Note that GitHub Pages is best for static websites. For a full-stack app with a server component, consider Heroku, Vercel, or another hosting platform. 