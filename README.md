# Pixel image generator

A very simple experiment in Javascript/Typescript developed in a few hours.

## How it works

The generator takes an image width & height, and a seed which is an integer between 0 and 2 to the power of the number of pixels (`2 ^ (width * height)`). Each bit of the seed represents a pixel of the image. If the bit value is 0 the pixel will be black, otherwise it will be white.

## Demo

https://pixel-image-generator.herokuapp.com/
