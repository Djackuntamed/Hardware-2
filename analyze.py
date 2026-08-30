import cv2
import numpy as np

cap = cv2.VideoCapture(r"C:\Users\IT - Admin\Downloads\hailuo-2_3_create_a_slide_show_video_that_shows_the_items_in_the_image_one_by_one._where_on-0.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 60)
ret, frame = cap.read()
cap.release()
print("shape", frame.shape)
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
h, w = gray.shape
block_w = 200
positions = []
for x in range(0, w - block_w, 20):
    strip = gray[:, x:x+block_w]
    var = cv2.Laplacian(strip, cv2.CV_64F).var()
    positions.append((x, var))
for x, v in positions:
    print(x, round(v, 1))
