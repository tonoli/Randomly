# Randomly
Upload pictures and select randomly one of them

### What it is? 

- Simple home page with a browse file button
- A countdown of the number of images that you stored
- The button "Go" that opens a new page where there is the random image at the middle. 
- The button "clear" that deletes all the images stored in the db

### How it works? 

For this app I set a NodeJS server with Express and then use 2 princimal middlewares, Multer and fs-extra. 

- *Multer* is the middleware that allows me to upload files, and in this case images on a particular folder (./uploads)
- *fs-extra* is the middleware that allows me to manipulate the FileSystem in my server (browse, create and delete files)

I tried to comment as much as possible my code so it's readable.
