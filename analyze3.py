import cv2
import numpy as np
from PIL import Image

cap = cv2.VideoCapture(r"C:\Users\IT - Admin\Downloads\hailuo-2_3_create_a_slide_show_video_that_shows_the_items_in_the_image_one_by_one._where_on-0.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 90)
ret, frame = cap.read()
cap.release()
cv2.imwrite(r"C:\Hardware\2\frame_sample.png", frame)
print("saved frame_sample.png", frame.shape)

h, w, _ = frame.shape
third = w // 3
for i, (x0, x1) in enumerate([(0, third), (third, 2 * third), (2 * third, w)]):
    region = frame[:, x0:x1]
    mean = region.mean(axis=(0, 1))
    std = float(region.std())
    print(f"third {i} ({x0}-{x1}): mean_bgr={[round(m) for m in mean]}, std={round(std, 1)}")

def info(path):
    im = Image.open(path)
    return im.size, im.mode
paths = [
    r"C:\Hardware\2\assets\tjv-products-1080.webp",
    r"C:\Users\IT - Admin\Downloads\line 2.jpeg",
    r"C:\Users\IT - Admin\Downloads\line 3.jpeg",
    r"C:\Users\IT - Admin\Downloads\Cement.jpeg",
    r"C:\Users\IT - Admin\Downloads\line 1.jpeg",
]
for p in paths:
    try:
        print(p, info(p))
    except Exception as e:
        print(p, "ERR", e)
