from PIL import Image

def getRGBfromI(RGBint):
    blue =  RGBint & 255
    green = (RGBint >> 8) & 255
    red =   (RGBint >> 16) & 255
    return red, green, blue

def getIfromRGB(rgb):
    red = rgb[0]
    green = rgb[1]
    blue = rgb[2]
    #print(red, green, blue)
    RGBint = (red<<16) + (green<<8) + blue
    return RGBint

im = Image.open('/Users/li/Downloads/tu3.png') # Can be many different formats.
pix = im.load()
#print(im.size)  # Get the width and hight of the image for iterating over

for x in range(0, 49):
  for y in range(0, 49):
    #print(pix[x,y])  # Get the RGBA Value of the a pixel of an image
    rgb = pix[x,y]
    i = getIfromRGB(rgb)
    if i != 0:
      #print(x, y, getIfromRGB(rgb))
      print("echo y | canvasd tx canvas paint 0 " + str(x), " " , str(y), " ", str(i), " --from $alice --gas 100000")