import cv2
import numpy as np

cap = cv2.VideoCapture(r"C:\Users\IT - Admin\Downloads\hailuo-2_3_create_a_slide_show_video_that_shows_the_items_in_the_image_one_by_one._where_on-0.mp4")
w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
print("size", w, h, "fps", cap.get(cv2.CAP_PROP_FPS), "frames", int(cap.get(cv2.CAP_PROP_FRAME_COUNT)))

# Analyze several frames to find a stable 3-panel one
for fidx in [30, 60, 90, 120]:
    cap.set(cv2.CAP_PROP_POS_FRAMES, fidx)
    ret, frame = cap.read()
    if not ret: continue
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # compute blur per vertical column (x), thin strip
    col_var = []
    col_w = 4
    for x in range(0, w, col_w):
        strip = gray[:, x:x+col_w]
        col_var.append(cv2.Laplacian(strip, cv2.CV_64F).var())
    col_var = np.array(col_var)
    # find the sharpest vertical band of width ~458
    best_x = 0
    best_sum = 0
    bw = 458
    for x in range(0, w - bw, 4):
        s = col_var[x:x+bw].sum()
        if s > best_sum:
            best_sum = s
            best_x = x
    # left/center/right thirds sharp band sums
    third = w // 3
    sums = [col_var[i*third:(i+1)*third].sum() for i in range(3)]
    # also check for vertical dark divider lines (gap between panels)
    # compute mean per column, find columns with very low std (dividers)
    print(f"frame {fidx}: sharpest band at x={best_x}-{best_x+bw} (sum {best_sum:.0f}), thirds={[round(s) for s in sums]}, peak_col={np.argmax(col_var)}")

cap.release()
