import cv2
import numpy as np
from PIL import Image

im = np.array(Image.open(r"C:\Hardware\2\assets\tjv-products-1080.webp").convert("RGB"))
h, w, _ = im.shape
print("composite size", w, h)

# Detect vertical edges (item group boundaries) by scanning column-to-column color variance
gray = cv2.cvtColor(im, cv2.COLOR_RGB2GRAY)
# gradient magnitude in x
gx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
mag = np.abs(gx)
# smooth vertically to get a per-column energy profile
energy = mag.mean(axis=0)
# print energy at every 50px
for x in range(0, w, 50):
    print(x, round(energy[x], 1))

# Find peaks (boundaries) - high energy = edge between groups
from scipy.ndimage import maximum_filter, label
local_max = maximum_filter(energy, size=200)
peaks = np.where((energy == local_max) & (energy > energy.mean() * 1.5))[0]
print("PEAKS (group boundaries):", peaks.tolist())
