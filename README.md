# codereview_Q_141491

These scripts are for generating an SVG path that draws a circle using bezier curve C commands.

The reason for this script was to create a circle path for an Android VectorDrawable.
I am animating an Android VectorDrawable of a circle to a square. 
I need the computer's help via this script to do the math for generating the circle.

I ended up reusing the script, when I had similiar animations to create. It was useful.
If you'd like to see the resulting xml of the two states of the vector drawables please comment,
and I will add them.


Code Review question Ref:
http://codereview.stackexchange.com/questions/141491/calculating-a-circle-with-bezier-curves?noredirect=1#comment265256_141491

Calculating a circle with bezier curves:
http://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves

Android VectorDrawable Ref:
https://developer.android.com/reference/android/graphics/drawable/VectorDrawable.html

Android AnimatedVectorDrawable Ref:
https://developer.android.com/reference/android/graphics/drawable/AnimatedVectorDrawable.html

Good reference for AnimatedVectoryDrawable:
http://blog.sqisland.com/2014/10/first-look-at-animated-vector-drawable.html

Cool example of animating android logo to apple logo:
https://lewismcgeary.github.io/posts/animated-vector-drawable-pathMorphing/
